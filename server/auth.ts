import { Express, Request, Response } from "express";
import { storage } from "./storage";
import { createUserSchema, loginWithIdSchema, User } from "@shared/schema";

export function setupAuthRoutes(app: Express) {
  // Register a new user
  app.post("/api/register", async (req, res) => {
    try {
      // Validate input
      const parsedData = createUserSchema.safeParse(req.body);
      if (!parsedData.success) {
        return res.status(400).json({ 
          error: "Invalid input",
          details: parsedData.error.format()
        });
      }

      // Create the user with minimal data
      const { user, plainUniqueId } = await storage.createUser(parsedData.data);

      // Send back success response with the user data
      res.status(201).json({
        message: "User created successfully with your chosen ID.",
        user: {
          displayName: user.displayName,
          id: user.id,
          uniqueId: user.uniqueId,
          points: user.points,
          badges: user.badges,
        }
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  // Login with unique ID
  app.post("/api/login", async (req, res) => {
    try {
      // Validate input
      const parsedData = loginWithIdSchema.safeParse(req.body);
      if (!parsedData.success) {
        return res.status(400).json({ 
          error: "Invalid input",
          details: parsedData.error.format()
        });
      }

      // Find user by uniqueId (this method securely verifies the ID)
      const user = await storage.getUserByUniqueId(parsedData.data.uniqueId);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Update last login timestamp
      const updatedUser = await storage.updateUserLastLogin(user.id);

      // Return user data
      res.status(200).json({
        id: updatedUser.id,
        displayName: updatedUser.displayName,
        uniqueId: updatedUser.uniqueId,
        points: updatedUser.points,
        badges: updatedUser.badges,
        isAdmin: updatedUser.isAdmin || false,
        certificateIssued: updatedUser.certificateIssued || false,
        certificateDate: updatedUser.certificateDate
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Failed to login" });
    }
  });

  // Get current user progress
  app.get("/api/progress/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({ error: "User ID required" });
      }

      const progress = await storage.getUserProgress(userId);
      if (!progress) {
        return res.status(404).json({ error: "Progress not found for this user" });
      }

      res.status(200).json(progress);
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ error: "Failed to fetch progress" });
    }
  });
  
  // Save user progress
  app.post("/api/progress/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({ error: "User ID required" });
      }

      const progress = await storage.saveUserProgress(userId, req.body);
      res.status(200).json(progress);
    } catch (error) {
      console.error("Error saving progress:", error);
      res.status(500).json({ error: "Failed to save progress" });
    }
  });
  
  // Reset user progress
  app.post("/api/progress/:userId/reset", async (req, res) => {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({ error: "User ID required" });
      }

      await storage.resetUserProgress(userId);
      res.status(200).json({ message: "Progress reset successfully" });
    } catch (error) {
      console.error("Error resetting progress:", error);
      res.status(500).json({ error: "Failed to reset progress" });
    }
  });
  
  // ADMIN API: Get all users (admin only)
  app.get("/api/admin/users", async (req, res) => {
    try {
      // Verify admin status by checking the Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: "Authorization required" });
      }
      
      // Get user ID from Authorization header
      const userId = authHeader.split(' ')[1]; // Format: "Bearer <userId>"
      const user = await storage.getUserByUniqueId(userId);
      
      // Check if user is admin
      if (!user?.isAdmin) {
        return res.status(403).json({ error: "Admin access required" });
      }
      
      // Get all users
      const allUsers = await storage.getAllUsers();
      
      // Map the users to only the data we want to expose
      const sanitizedUsers = allUsers.map((user: User) => ({
        id: user.id,
        uniqueId: user.uniqueId,
        displayName: user.displayName,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
        points: user.points,
        certificateIssued: user.certificateIssued || false,
        certificateDate: user.certificateDate
      }));
      
      res.status(200).json(sanitizedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });
  
  // ADMIN API: Get all certificates (admin only)
  app.get("/api/admin/certificates", async (req, res) => {
    try {
      // Verify admin status by checking the Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: "Authorization required" });
      }
      
      // Get user ID from Authorization header
      const userId = authHeader.split(' ')[1]; // Format: "Bearer <userId>"
      const user = await storage.getUserByUniqueId(userId);
      
      // Check if user is admin
      if (!user?.isAdmin) {
        return res.status(403).json({ error: "Admin access required" });
      }
      
      // Get users with certificates
      const allUsers = await storage.getAllUsers();
      const certificates = allUsers
        .filter((user: User) => user.certificateIssued)
        .map((user: User) => ({
          uniqueId: user.uniqueId,
          displayName: user.displayName,
          certificateDate: user.certificateDate,
          points: user.points
        }));
      
      res.status(200).json(certificates);
    } catch (error) {
      console.error("Error fetching certificates:", error);
      res.status(500).json({ error: "Failed to fetch certificates" });
    }
  });
  
  // ADMIN API: Issue certificate to a user
  app.post("/api/admin/issue-certificate/:userId", async (req, res) => {
    try {
      // Verify admin status by checking the Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: "Authorization required" });
      }
      
      // Get admin ID from Authorization header
      const adminId = authHeader.split(' ')[1]; // Format: "Bearer <userId>"
      const admin = await storage.getUserByUniqueId(adminId);
      
      // Check if user is admin
      if (!admin?.isAdmin) {
        return res.status(403).json({ error: "Admin access required" });
      }
      
      // Get user ID from params
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({ error: "User ID required" });
      }
      
      // Find user
      const user = await storage.getUserByUniqueId(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Issue certificate
      const updatedUser = await storage.issueCertificate(user.id);
      
      res.status(200).json({
        message: "Certificate issued successfully",
        user: {
          uniqueId: updatedUser.uniqueId,
          displayName: updatedUser.displayName,
          certificateDate: updatedUser.certificateDate
        }
      });
    } catch (error) {
      console.error("Error issuing certificate:", error);
      res.status(500).json({ error: "Failed to issue certificate" });
    }
  });
}
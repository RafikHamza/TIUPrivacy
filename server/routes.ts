import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { createUserSchema, loginWithIdSchema, progressSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to register a new user
  app.post("/api/register", async (req, res) => {
    try {
      // Validate the request body
      const userData = createUserSchema.parse(req.body);
      
      // Check if user with this email already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ 
          message: "A user with this email already exists" 
        });
      }
      
      // Create the user
      const newUser = await storage.createUser(userData);
      
      // Return the user data (excluding sensitive fields if needed)
      res.status(201).json({ 
        id: newUser.id, 
        uniqueId: newUser.uniqueId,
        displayName: newUser.displayName,
        message: "Registration successful! Use your unique ID to login later."
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid input data",
          errors: error.errors 
        });
      }
      
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Failed to register user" });
    }
  });

  // API endpoint to login with unique ID
  app.post("/api/login", async (req, res) => {
    try {
      // Validate the request body
      const loginData = loginWithIdSchema.parse(req.body);
      
      // Find the user
      const user = await storage.getUserByUniqueId(loginData.uniqueId);
      if (!user) {
        return res.status(401).json({ message: "Invalid unique ID" });
      }
      
      // Update last login time
      await storage.updateUserLastLogin(user.id);
      
      // Return the user data (excluding sensitive fields)
      res.json({ 
        id: user.id, 
        uniqueId: user.uniqueId,
        displayName: user.displayName,
        points: user.points,
        badges: user.badges
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid input data",
          errors: error.errors 
        });
      }
      
      console.error("Error logging in:", error);
      res.status(500).json({ message: "Failed to log in" });
    }
  });

  // API endpoint to get user progress by user ID
  app.get("/api/progress/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      
      // Get progress from storage
      const progress = await storage.getUserProgress(userId);
      
      // If no progress found, return default empty progress
      if (!progress) {
        return res.json({ 
          modules: {},
          points: 0,
          badges: [],
          userId
        });
      }
      
      res.json(progress);
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  // API endpoint to save user progress
  app.post("/api/progress/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      
      // Validate the request body
      const progress = progressSchema.parse(req.body);
      
      // Save progress to storage
      const savedProgress = await storage.saveUserProgress(userId, progress);
      
      res.json(savedProgress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid progress data",
          errors: error.errors 
        });
      }
      
      console.error("Error saving progress:", error);
      res.status(500).json({ message: "Failed to save progress" });
    }
  });

  // API endpoint to reset user progress
  app.post("/api/progress/:userId/reset", async (req, res) => {
    try {
      const { userId } = req.params;
      
      // Reset progress (create new empty progress)
      const emptyProgress = {
        modules: {},
        points: 0,
        badges: [],
        userId
      };
      
      const resetProgress = await storage.saveUserProgress(userId, emptyProgress);
      
      res.json(resetProgress);
    } catch (error) {
      console.error("Error resetting progress:", error);
      res.status(500).json({ message: "Failed to reset progress" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

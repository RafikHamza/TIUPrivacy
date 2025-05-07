// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/auth-utils.ts
import * as crypto from "crypto";
function hashId(uniqueId, salt) {
  const hash = crypto.createHmac("sha256", salt);
  hash.update(uniqueId);
  return `${hash.digest("hex")}.${salt}`;
}
function verifyId(providedId, storedHashWithSalt) {
  const [_, salt] = storedHashWithSalt.split(".");
  const hashToCheck = hashId(providedId, salt);
  return crypto.timingSafeEqual(
    Buffer.from(hashToCheck),
    Buffer.from(storedHashWithSalt)
  );
}
function generateUniqueId(length = 10) {
  return crypto.randomBytes(Math.ceil(length * 3 / 4)).toString("base64").replace(/[+/=]/g, "").slice(0, length);
}

// server/storage.ts
var MemStorage = class {
  users;
  progressData;
  currentId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.progressData = /* @__PURE__ */ new Map();
    this.currentId = 1;
    this.initializeAdminUser();
  }
  async initializeAdminUser() {
    try {
      const adminUser = await this.getUserByUniqueId("Rafik8819");
      if (!adminUser) {
        const salt = generateUniqueId(16);
        const hashedId = hashId("Rafik8819", salt);
        const adminUser2 = {
          id: this.currentId++,
          uniqueId: "Rafik8819",
          hashedId,
          displayName: "Prof. HAMZA Rafik",
          createdAt: /* @__PURE__ */ new Date(),
          lastLogin: /* @__PURE__ */ new Date(),
          points: 0,
          completedModules: [],
          badges: [],
          progress: {},
          isAdmin: true,
          certificateIssued: false,
          certificateDate: null
        };
        this.users.set(adminUser2.id, adminUser2);
        console.log("Admin user initialized with ID: Rafik8819");
      }
    } catch (error) {
      console.error("Failed to initialize admin user:", error);
    }
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUniqueId(uniqueId) {
    return Array.from(this.users.values()).find((user) => {
      try {
        return verifyId(uniqueId, user.hashedId);
      } catch (error) {
        return false;
      }
    });
  }
  async createUser(userData) {
    const id = this.currentId++;
    const plainUniqueId = userData.uniqueId;
    const existingUser = await this.getUserByUniqueId(plainUniqueId);
    if (existingUser) {
      throw new Error("This ID is already in use. Please choose a different one.");
    }
    const hashedId = hashId(plainUniqueId, generateUniqueId(16));
    const now = /* @__PURE__ */ new Date();
    const user = {
      id,
      uniqueId: plainUniqueId,
      hashedId,
      // This is what's actually used for verification
      displayName: userData.displayName,
      createdAt: now,
      lastLogin: now,
      points: 0,
      completedModules: [],
      badges: [],
      progress: {},
      isAdmin: false,
      certificateIssued: false,
      certificateDate: null
    };
    this.users.set(id, user);
    return { user, plainUniqueId };
  }
  async updateUserLastLogin(id) {
    const user = await this.getUser(id);
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = {
      ...user,
      lastLogin: /* @__PURE__ */ new Date()
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  async getUserProgress(userId) {
    return this.progressData.get(userId);
  }
  async saveUserProgress(userId, progress) {
    const progressWithUserId = {
      ...progress,
      userId
    };
    this.progressData.set(userId, progressWithUserId);
    return progressWithUserId;
  }
  async resetUserProgress(userId) {
    this.progressData.delete(userId);
  }
  async getAllUsers() {
    return Array.from(this.users.values());
  }
  async issueCertificate(userId) {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = {
      ...user,
      certificateIssued: true,
      certificateDate: /* @__PURE__ */ new Date()
    };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  uniqueId: text("unique_id").notNull().unique(),
  // Unique ID for user login
  hashedId: text("hashed_id").notNull().unique(),
  // Hashed version of the unique ID for security
  displayName: text("display_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastLogin: timestamp("last_login").defaultNow().notNull(),
  points: integer("points").notNull().default(0),
  completedModules: jsonb("completed_modules").notNull().default([]),
  badges: jsonb("badges").notNull().default([]),
  progress: jsonb("progress").notNull().default({}),
  isAdmin: boolean("is_admin").notNull().default(false),
  // Flag for admin users
  certificateIssued: boolean("certificate_issued").notNull().default(false),
  // Track if certificate was issued
  certificateDate: timestamp("certificate_date")
  // Date when certificate was issued
});
var createUserSchema = z.object({
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  uniqueId: z.string().min(6, "ID must be at least 6 characters").max(20, "ID must not exceed 20 characters")
});
var loginWithIdSchema = z.object({
  uniqueId: z.string().min(6, "ID must be at least 6 characters")
});
var progressSchema = z.object({
  modules: z.record(z.object({
    completed: z.boolean().default(false),
    slides: z.record(z.boolean()).default({}),
    quizzes: z.record(z.number()).default({}),
    challenges: z.record(z.boolean()).default({}),
    lastVisited: z.string().optional()
  })),
  points: z.number().default(0),
  badges: z.array(z.string()).default([]),
  userId: z.string().optional()
  // Store userId to link progress with a user
});

// server/auth.ts
function setupAuthRoutes(app2) {
  app2.post("/api/register", async (req, res) => {
    try {
      const parsedData = createUserSchema.safeParse(req.body);
      if (!parsedData.success) {
        return res.status(400).json({
          error: "Invalid input",
          details: parsedData.error.format()
        });
      }
      const { user, plainUniqueId } = await storage.createUser(parsedData.data);
      res.status(201).json({
        message: "User created successfully with your chosen ID.",
        user: {
          displayName: user.displayName,
          id: user.id,
          uniqueId: user.uniqueId,
          points: user.points,
          badges: user.badges
        }
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  });
  app2.post("/api/login", async (req, res) => {
    try {
      const parsedData = loginWithIdSchema.safeParse(req.body);
      if (!parsedData.success) {
        return res.status(400).json({
          error: "Invalid input",
          details: parsedData.error.format()
        });
      }
      const user = await storage.getUserByUniqueId(parsedData.data.uniqueId);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const updatedUser = await storage.updateUserLastLogin(user.id);
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
  app2.get("/api/progress/:userId", async (req, res) => {
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
  app2.post("/api/progress/:userId", async (req, res) => {
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
  app2.post("/api/progress/:userId/reset", async (req, res) => {
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
  app2.get("/api/admin/users", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: "Authorization required" });
      }
      const userId = authHeader.split(" ")[1];
      const user = await storage.getUserByUniqueId(userId);
      if (!user?.isAdmin) {
        return res.status(403).json({ error: "Admin access required" });
      }
      const allUsers = await storage.getAllUsers();
      const sanitizedUsers = allUsers.map((user2) => ({
        id: user2.id,
        uniqueId: user2.uniqueId,
        displayName: user2.displayName,
        createdAt: user2.createdAt,
        lastLogin: user2.lastLogin,
        points: user2.points,
        certificateIssued: user2.certificateIssued || false,
        certificateDate: user2.certificateDate
      }));
      res.status(200).json(sanitizedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });
  app2.get("/api/admin/certificates", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: "Authorization required" });
      }
      const userId = authHeader.split(" ")[1];
      const user = await storage.getUserByUniqueId(userId);
      if (!user?.isAdmin) {
        return res.status(403).json({ error: "Admin access required" });
      }
      const allUsers = await storage.getAllUsers();
      const certificates = allUsers.filter((user2) => user2.certificateIssued).map((user2) => ({
        uniqueId: user2.uniqueId,
        displayName: user2.displayName,
        certificateDate: user2.certificateDate,
        points: user2.points
      }));
      res.status(200).json(certificates);
    } catch (error) {
      console.error("Error fetching certificates:", error);
      res.status(500).json({ error: "Failed to fetch certificates" });
    }
  });
  app2.post("/api/admin/issue-certificate/:userId", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: "Authorization required" });
      }
      const adminId = authHeader.split(" ")[1];
      const admin = await storage.getUserByUniqueId(adminId);
      if (!admin?.isAdmin) {
        return res.status(403).json({ error: "Admin access required" });
      }
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({ error: "User ID required" });
      }
      const user = await storage.getUserByUniqueId(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
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

// server/routes.ts
import { z as z2 } from "zod";
async function registerRoutes(app2) {
  setupAuthRoutes(app2);
  const completionRecordSchema = z2.object({
    uniqueId: z2.string(),
    displayName: z2.string(),
    completionDate: z2.string(),
    scores: z2.object({
      phishingSimulator: z2.number(),
      passwordStrength: z2.number(),
      securityQuiz: z2.number(),
      overall: z2.number()
    })
  });
  const completedRecords = [];
  app2.post("/api/record-completion", async (req, res) => {
    try {
      const data = completionRecordSchema.parse(req.body);
      const existingRecord = completedRecords.find((record) => record.uniqueId === data.uniqueId);
      if (existingRecord) {
        Object.assign(existingRecord, data);
        return res.status(200).json({ message: "Completion record updated" });
      }
      completedRecords.push(data);
      console.log(`[${(/* @__PURE__ */ new Date()).toISOString()}] Student ${data.displayName} (ID: ${data.uniqueId}) completed training with overall score: ${data.scores.overall}%`);
      return res.status(201).json({ message: "Completion recorded successfully" });
    } catch (error) {
      console.error("Error recording completion:", error);
      return res.status(400).json({ error: "Invalid completion data" });
    }
  });
  app2.get("/api/completion-records", (req, res) => {
    return res.status(200).json(completedRecords);
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();

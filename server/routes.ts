import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuthRoutes } from "./auth";
import { progressSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up all auth-related routes (registration, login, progress management)
  setupAuthRoutes(app);
  
  // We'll add educational game-related API routes here later

  const httpServer = createServer(app);

  return httpServer;
}

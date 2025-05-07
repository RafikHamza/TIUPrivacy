import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuthRoutes } from "./auth";
import { progressSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up all auth-related routes (registration, login, progress management)
  setupAuthRoutes(app);
  
  // Endpoint to record when a student completes the training
  const completionRecordSchema = z.object({
    uniqueId: z.string(),
    displayName: z.string(),
    completionDate: z.string(),
    scores: z.object({
      phishingSimulator: z.number(),
      passwordStrength: z.number(),
      securityQuiz: z.number(),
      overall: z.number()
    })
  });

  // Store completed records for instructor access
  const completedRecords: any[] = [];

  app.post('/api/record-completion', async (req, res) => {
    try {
      const data = completionRecordSchema.parse(req.body);
      
      // Check if this uniqueId has already completed the training
      const existingRecord = completedRecords.find(record => record.uniqueId === data.uniqueId);
      if (existingRecord) {
        // Update the existing record with new scores
        Object.assign(existingRecord, data);
        return res.status(200).json({ message: 'Completion record updated' });
      }
      
      // Add a new completion record
      completedRecords.push(data);
      
      // For debugging, log the completion to the console
      console.log(`[${new Date().toISOString()}] Student ${data.displayName} (ID: ${data.uniqueId}) completed training with overall score: ${data.scores.overall}%`);
      
      return res.status(201).json({ message: 'Completion recorded successfully' });
    } catch (error) {
      console.error('Error recording completion:', error);
      return res.status(400).json({ error: 'Invalid completion data' });
    }
  });
  
  // Endpoint for instructors to view completion records (would require authentication in production)
  app.get('/api/completion-records', (req, res) => {
    return res.status(200).json(completedRecords);
  });

  const httpServer = createServer(app);

  return httpServer;
}

import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  uniqueId: text("unique_id").notNull().unique(), // Unique ID for user login
  hashedId: text("hashed_id").notNull().unique(), // Hashed version of the unique ID for security
  displayName: text("display_name").notNull(), 
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastLogin: timestamp("last_login").defaultNow().notNull(),
  points: integer("points").notNull().default(0),
  completedModules: jsonb("completed_modules").notNull().default([]),
  badges: jsonb("badges").notNull().default([]),
  progress: jsonb("progress").notNull().default({}),
  isAdmin: boolean("is_admin").notNull().default(false), // Flag for admin users
  certificateIssued: boolean("certificate_issued").notNull().default(false), // Track if certificate was issued
  certificateDate: timestamp("certificate_date"), // Date when certificate was issued
});

// Schema for creating a new user (minimal data collection)
export const createUserSchema = z.object({
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  uniqueId: z.string().min(6, "ID must be at least 6 characters").max(20, "ID must not exceed 20 characters"),
});

// Schema for logging in with just uniqueId
export const loginWithIdSchema = z.object({
  uniqueId: z.string().min(6, "ID must be at least 6 characters"),
});

export type CreateUser = z.infer<typeof createUserSchema>;
export type LoginWithId = z.infer<typeof loginWithIdSchema>;
export type User = typeof users.$inferSelect;

export const progressSchema = z.object({
  modules: z.record(z.object({
    completed: z.boolean().default(false),
    slides: z.record(z.boolean()).default({}),
    quizzes: z.record(z.number()).default({}),
    challenges: z.record(z.boolean()).default({}),
    lastVisited: z.string().optional(),
  })),
  points: z.number().default(0),
  badges: z.array(z.string()).default([]),
  userId: z.string().optional(), // Store userId to link progress with a user
});

export type UserProgress = z.infer<typeof progressSchema>;

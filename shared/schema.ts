import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  uniqueId: text("unique_id").notNull().unique(), // Unique ID for user login
  displayName: text("display_name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  lastLogin: timestamp("last_login").defaultNow().notNull(),
  points: integer("points").notNull().default(0),
  completedModules: jsonb("completed_modules").notNull().default([]),
  badges: jsonb("badges").notNull().default([]),
  progress: jsonb("progress").notNull().default({}),
});

// Schema for creating a new user
export const createUserSchema = createInsertSchema(users).pick({
  displayName: true,
  email: true,
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

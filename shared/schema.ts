import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  points: integer("points").notNull().default(0),
  completedModules: jsonb("completed_modules").notNull().default([]),
  badges: jsonb("badges").notNull().default([]),
  progress: jsonb("progress").notNull().default({}),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
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
});

export type UserProgress = z.infer<typeof progressSchema>;

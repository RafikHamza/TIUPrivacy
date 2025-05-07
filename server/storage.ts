import { nanoid } from 'nanoid';
import { users, type User, type CreateUser, type UserProgress, progressSchema } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUniqueId(uniqueId: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(userData: CreateUser): Promise<User>;
  updateUserLastLogin(id: number): Promise<User>;
  getUserProgress(userId: string): Promise<UserProgress | undefined>;
  saveUserProgress(userId: string, progress: UserProgress): Promise<UserProgress>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private progressData: Map<string, UserProgress>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.progressData = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUniqueId(uniqueId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.uniqueId === uniqueId,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(userData: CreateUser): Promise<User> {
    const id = this.currentId++;
    
    // Generate a unique ID (8 characters)
    const uniqueId = nanoid(8);
    
    const now = new Date();
    
    const user: User = {
      id,
      uniqueId,
      displayName: userData.displayName,
      email: userData.email,
      createdAt: now,
      lastLogin: now,
      points: 0,
      completedModules: [],
      badges: [],
      progress: {}
    };
    
    this.users.set(id, user);
    return user;
  }

  async updateUserLastLogin(id: number): Promise<User> {
    const user = await this.getUser(id);
    if (!user) {
      throw new Error('User not found');
    }
    
    const updatedUser = {
      ...user,
      lastLogin: new Date()
    };
    
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getUserProgress(userId: string): Promise<UserProgress | undefined> {
    return this.progressData.get(userId);
  }

  async saveUserProgress(userId: string, progress: UserProgress): Promise<UserProgress> {
    const progressWithUserId = {
      ...progress,
      userId
    };
    this.progressData.set(userId, progressWithUserId);
    return progressWithUserId;
  }
}

export const storage = new MemStorage();

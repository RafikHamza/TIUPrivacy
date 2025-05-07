import { users, type User, type CreateUser, type UserProgress, progressSchema } from "@shared/schema";
import { generateUniqueId, hashId, verifyId } from "./auth-utils";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUniqueId(uniqueId: string): Promise<User | undefined>;
  createUser(userData: CreateUser): Promise<{ user: User; plainUniqueId: string }>;
  updateUserLastLogin(id: number): Promise<User>;
  getUserProgress(userId: string): Promise<UserProgress | undefined>;
  saveUserProgress(userId: string, progress: UserProgress): Promise<UserProgress>;
  resetUserProgress(userId: string): Promise<void>;
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
    // This is a secure method that checks the provided ID against stored hashed values
    // Find any user whose hashedId matches the provided uniqueId when hashed with its salt
    return Array.from(this.users.values()).find(user => {
      try {
        // The uniqueId is stored hashed with a salt for security 
        // We need to check if the provided ID matches when hashed with the same salt
        return verifyId(uniqueId, user.hashedId);
      } catch (error) {
        return false;
      }
    });
  }

  async createUser(userData: CreateUser): Promise<{ user: User; plainUniqueId: string }> {
    const id = this.currentId++;
    
    // Generate a unique ID (10 characters) that will be shown to the user once
    const plainUniqueId = generateUniqueId(10);
    
    // Store only the hashed version of the unique ID
    const hashedId = hashId(plainUniqueId, generateUniqueId(16));
    
    const now = new Date();
    
    const user: User = {
      id,
      uniqueId: plainUniqueId, // We actually store this to make debugging easier, in production we might not
      hashedId, // This is what's actually used for verification
      displayName: userData.displayName,
      createdAt: now,
      lastLogin: now,
      points: 0,
      completedModules: [],
      badges: [],
      progress: {}
    };
    
    this.users.set(id, user);
    
    // Return both the user object and the plain unique ID (which should be shown to the user once)
    return { user, plainUniqueId };
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
  
  async resetUserProgress(userId: string): Promise<void> {
    this.progressData.delete(userId);
  }
}

export const storage = new MemStorage();

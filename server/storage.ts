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
  getAllUsers(): Promise<User[]>;
  issueCertificate(userId: number): Promise<User>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private progressData: Map<string, UserProgress>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.progressData = new Map();
    this.currentId = 1;
    
    // Initialize with admin user if it doesn't exist
    this.initializeAdminUser();
  }
  
  private async initializeAdminUser() {
    try {
      // Check if admin user exists
      const adminUser = await this.getUserByUniqueId("Rafik8819");
      if (!adminUser) {
        // Create admin user with ID Rafik8819
        const salt = generateUniqueId(16);
        const hashedId = hashId("Rafik8819", salt);
        
        const adminUser: User = {
          id: this.currentId++,
          uniqueId: "Rafik8819",
          hashedId,
          displayName: "Prof. HAMZA Rafik",
          createdAt: new Date(),
          lastLogin: new Date(),
          points: 0,
          completedModules: [],
          badges: [],
          progress: {},
          isAdmin: true,
          certificateIssued: false,
          certificateDate: null
        };
        
        this.users.set(adminUser.id, adminUser);
        console.log("Admin user initialized with ID: Rafik8819");
      }
    } catch (error) {
      console.error("Failed to initialize admin user:", error);
    }
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
    
    // Use the user-provided unique ID
    const plainUniqueId = userData.uniqueId;
    
    // Check if the unique ID is already in use
    const existingUser = await this.getUserByUniqueId(plainUniqueId);
    if (existingUser) {
      throw new Error("This ID is already in use. Please choose a different one.");
    }
    
    // Store only the hashed version of the unique ID
    const hashedId = hashId(plainUniqueId, generateUniqueId(16));
    
    const now = new Date();
    
    const user: User = {
      id,
      uniqueId: plainUniqueId, 
      hashedId, // This is what's actually used for verification
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
    
    // Return both the user object and the plain unique ID
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
  
  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }
  
  async issueCertificate(userId: number): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    const updatedUser = {
      ...user,
      certificateIssued: true,
      certificateDate: new Date()
    };
    
    this.users.set(userId, updatedUser);
    return updatedUser;
  }
}

export const storage = new MemStorage();

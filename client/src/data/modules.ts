import { Module } from "@/lib/types";
import { phishingModule } from "./phishing";
import { socialMediaModule } from "./socialMedia";
import { aiChatbotsModule } from "./aiChatbots";
import { emailModule } from "./email";
import { finalChallengeModule } from "./finalChallenge";

// All modules in the application
export const allModules: Module[] = [
  phishingModule,
  emailModule,
  socialMediaModule,
  aiChatbotsModule,
  finalChallengeModule
];

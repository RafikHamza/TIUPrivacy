import * as crypto from 'crypto';

// Generate a secure, random salt
export function generateSalt(length: number = 16): string {
  return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex')
    .slice(0, length);
}

// Hash a uniqueId with a salt using SHA-256
export function hashId(uniqueId: string, salt: string): string {
  const hash = crypto.createHmac('sha256', salt);
  hash.update(uniqueId);
  return `${hash.digest('hex')}.${salt}`;
}

// Verify if a provided uniqueId matches the stored hash
export function verifyId(providedId: string, storedHashWithSalt: string): boolean {
  const [_, salt] = storedHashWithSalt.split('.');
  const hashToCheck = hashId(providedId, salt);
  
  // Use a timing-safe comparison to prevent timing attacks
  return crypto.timingSafeEqual(
    Buffer.from(hashToCheck), 
    Buffer.from(storedHashWithSalt)
  );
}

// Generate a unique ID for a user (used for registration)
export function generateUniqueId(length: number = 10): string {
  // Generate a random ID with a mix of letters and numbers
  // This will be shown to the user once during registration
  return crypto.randomBytes(Math.ceil(length * 3/4))
    .toString('base64')
    .replace(/[+/=]/g, '')
    .slice(0, length);
}
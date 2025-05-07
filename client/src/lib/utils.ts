import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class values into a single className string using clsx and tailwind-merge
 * This utility makes it easier to conditionally apply Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number to a specific locale and style
 */
export function formatNumber(
  number: number,
  options: Intl.NumberFormatOptions = {},
  locale = "en-US"
): string {
  return new Intl.NumberFormat(locale, options).format(number);
}

/**
 * Wait for a specific amount of time
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Format a date to a specific locale and style
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  },
  locale = "en-US"
): string {
  const dateToFormat = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options).format(dateToFormat);
}

/**
 * Truncate a string to a specific length and append an ellipsis if needed
 */
export function truncateString(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

/**
 * Create a debounced function that delays invoking the provided function
 * until after the specified wait time has elapsed since the last time it was invoked
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function (...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Generate a random ID
 */
export function generateId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Check if a value is empty (null, undefined, empty string, empty array, empty object)
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

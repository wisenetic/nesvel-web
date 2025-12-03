import { z } from 'zod';

/**
 * Creates a Zod schema for a required string field.
 * 
 * @param {string} message - Custom error message.
 * @returns {z.ZodString} The Zod schema.
 */
export const requiredString = (message: string = 'This field is required') => 
  z.string().min(1, { message });

/**
 * Creates a Zod schema for an email field.
 * 
 * @param {string} message - Custom error message.
 * @returns {z.ZodString} The Zod schema.
 */
export const emailSchema = (message: string = 'Invalid email address') => 
  z.string().email({ message });

/**
 * Creates a Zod schema for a password field with minimum length.
 * 
 * @param {number} minLength - Minimum length required.
 * @returns {z.ZodString} The Zod schema.
 */
export const passwordSchema = (minLength: number = 8) => 
  z.string().min(minLength, { message: `Password must be at least ${minLength} characters` });

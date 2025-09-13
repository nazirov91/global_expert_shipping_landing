import { pgTable, text, serial, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Quote requests table for storing customer quote submissions
export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  // Step 1: Route information
  origin: text("origin").notNull(),
  destination: text("destination").notNull(),
  pickupDate: text("pickup_date").notNull(),
  trailerType: text("trailer_type").notNull(),
  
  // Step 2: Vehicle information
  year: integer("year").notNull(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  isOperable: boolean("is_operable").notNull().default(true),
  
  // Step 3: Contact information
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  
  // System fields
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Create Zod schemas for validation
export const insertQuoteSchema = createInsertSchema(quotes).omit({
  id: true,
  createdAt: true,
});

// Create types
export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type Quote = typeof quotes.$inferSelect;

// Step schemas for the multi-step form
export const stepOneSchema = z.object({
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
  pickupDate: z.string().min(1, "Pickup date is required"),
  trailerType: z.enum(["open", "enclosed"], {
    required_error: "Trailer type is required",
  }),
});

export const stepTwoSchema = z.object({
  year: z.number().min(1900).max(new Date().getFullYear() + 2),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  isOperable: z.boolean().default(true),
});

export const stepThreeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
});

export type StepOne = z.infer<typeof stepOneSchema>;
export type StepTwo = z.infer<typeof stepTwoSchema>;
export type StepThree = z.infer<typeof stepThreeSchema>;
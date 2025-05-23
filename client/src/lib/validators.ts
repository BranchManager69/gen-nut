import { z } from "zod";

export const newsletterSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  consent: z.boolean().refine(val => val === true, {
    message: "You must consent to receive emails"
  })
});

export const contactSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consent: z.boolean().refine(val => val === true, {
    message: "You must consent to us storing your information"
  })
});

export const bookingSchema = z.object({
  date: z.date({
    required_error: "Please select a date"
  }),
  timeSlot: z.string({
    required_error: "Please select a time slot"
  }),
  service: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional()
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type BookingFormData = z.infer<typeof bookingSchema>;

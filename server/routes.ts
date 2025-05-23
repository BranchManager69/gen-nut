import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs";
import { insertNewsletterSchema, insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

// Set up multer for file uploads
const uploadDir = path.join(process.cwd(), "uploads");

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      // Generate a unique filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max file size
  },
  fileFilter: function (req, file, cb) {
    // Accept only certain file types
    const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png'];
    const ext = path.extname(file.originalname).toLowerCase();
    
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, JPG, and PNG files are allowed.') as any);
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Newsletter subscription endpoint
  app.post("/api/newsletter", async (req: Request, res: Response) => {
    try {
      const data = insertNewsletterSchema.parse(req.body);
      
      // Check if email is already subscribed
      const existingSubscriber = await storage.getNewsletterSubscriberByEmail(data.email);
      if (existingSubscriber) {
        return res.status(409).json({ message: "Email is already subscribed" });
      }
      
      const subscriber = await storage.createNewsletterSubscriber(data);
      res.status(201).json({ 
        message: "Subscription successful",
        subscriber: {
          id: subscriber.id,
          email: subscriber.email,
          firstName: subscriber.firstName,
          lastName: subscriber.lastName
        }
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      console.error("Newsletter subscription error:", error);
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });
  
  // Contact form submission endpoint
  app.post("/api/contact", upload.array('documents', 5), async (req: Request, res: Response) => {
    try {
      const data = insertContactSchema.parse(req.body);
      
      // Get uploaded files
      const files = req.files as Express.Multer.File[];
      const documentUrls = files.map(file => file.path);
      
      const message = await storage.createContactMessage({
        ...data,
        documentUrls
      });
      
      res.status(201).json({ 
        message: "Contact form submitted successfully",
        contactId: message.id
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      console.error("Contact form submission error:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });
  
  // Get approved reviews endpoint
  app.get("/api/reviews", async (req: Request, res: Response) => {
    try {
      const reviews = await storage.getAllReviews(true);
      res.status(200).json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });
  
  // For debugging: Get all newsletter subscribers
  if (process.env.NODE_ENV === "development") {
    app.get("/api/debug/subscribers", async (req: Request, res: Response) => {
      const subscribers = await storage.getAllNewsletterSubscribers();
      res.status(200).json(subscribers);
    });
    
    app.get("/api/debug/contacts", async (req: Request, res: Response) => {
      const messages = await storage.getAllContactMessages();
      res.status(200).json(messages);
    });
  }

  const httpServer = createServer(app);
  
  return httpServer;
}

import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Get Waitlist Count
  app.get(api.waitlist.count.path, async (_req, res) => {
    const count = await storage.getWaitlistCount();
    // Add a base number to make it look "live" and popular initially
    // 420 is a meme number, but 1243 looks more realistic/popular
    const baseCount = 1243; 
    res.json({ count: baseCount + count });
  });

  // Join Waitlist
  app.post(api.waitlist.create.path, async (req, res) => {
    try {
      const input = api.waitlist.create.input.parse(req.body);
      
      const existing = await storage.getWaitlistEntryByEmail(input.email);
      if (existing) {
        return res.status(409).json({ message: "Email already in waitlist" });
      }

      const entry = await storage.createWaitlistEntry(input);
      res.status(201).json(entry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}

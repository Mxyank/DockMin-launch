import { db } from "./db";
import {
  waitlistEntries,
  type InsertWaitlistEntry,
  type WaitlistEntry,
} from "@shared/schema";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry>;
  getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined>;
  getWaitlistCount(): Promise<number>;
}

export class DatabaseStorage implements IStorage {
  async createWaitlistEntry(entry: InsertWaitlistEntry): Promise<WaitlistEntry> {
    const [created] = await db
      .insert(waitlistEntries)
      .values(entry)
      .returning();
    return created;
  }

  async getWaitlistEntryByEmail(email: string): Promise<WaitlistEntry | undefined> {
    const [entry] = await db
      .select()
      .from(waitlistEntries)
      .where(eq(waitlistEntries.email, email));
    return entry;
  }

  async getWaitlistCount(): Promise<number> {
    const [result] = await db
      .select({ count: sql<number>`cast(count(*) as integer)` })
      .from(waitlistEntries);
    return result.count;
  }
}

export const storage = new DatabaseStorage();

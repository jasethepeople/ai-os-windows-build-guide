import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Public issue reports submitted from the build guide. No user account is
 * required; an optional contact address is stored only when a reporter offers it.
 */
export const bugReports = mysqlTable("bugReports", {
  id: int("id").autoincrement().primaryKey(),
  referenceCode: varchar("referenceCode", { length: 20 }).notNull().unique(),
  category: mysqlEnum("category", ["build", "launch", "integration", "documentation", "other"]).notNull(),
  severity: mysqlEnum("severity", ["low", "normal", "high", "critical"]).notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  description: text("description").notNull(),
  reproductionSteps: text("reproductionSteps"),
  environmentDetails: text("environmentDetails"),
  commandUsed: text("commandUsed"),
  contactEmail: varchar("contactEmail", { length: 320 }),
  status: mysqlEnum("status", ["new", "reviewing", "resolved"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type BugReport = typeof bugReports.$inferSelect;
export type InsertBugReport = typeof bugReports.$inferInsert;

import { pgTable, uuid, text, timestamp, jsonb, integer, primaryKey } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

// ==========================================
// 1. AUTH.JS CORE USER & SESSION TABLES
// ==========================================

export const users = pgTable("user", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique().notNull(),
  password: text("password"), // Stores the hashed user password securely
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  role: text("role").default("client").notNull(), // 'client' or 'admin'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const accounts = pgTable("account", {
    userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

// ==========================================
// 2. STITCHHUB WORKSPACE REQUISITION TABLES
// ==========================================

export const emailLogs = pgTable("email_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }), 
  subject: text("subject").notNull(),
  body: text("body").notNull(),
  status: text("status").default("pending").notNull(), // pending, drafted, escalated
  aiResponseDraft: text("ai_response_draft"),
  metadata: jsonb("metadata"), 
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const invoices = pgTable("invoices", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  invoiceNumber: text("invoice_number").notNull().unique(), // e.g., INV-2026-XXXX
  totalAmount: text("total_amount").notNull(),
  status: text("status").default("unpaid").notNull(), // paid, unpaid, shipping
  itemsSnapshot: jsonb("items_snapshot").notNull(), // Captures the cart array state permanently
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const languagesTable = pgTable("languages", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
});

export type Language = typeof languagesTable.$inferSelect;
export type InsertLanguage = typeof languagesTable.$inferInsert;

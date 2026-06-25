import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { languagesTable } from "./languages";

export const wordsTable = pgTable("words", {
  id: serial("id").primaryKey(),
  filipinoWord: text("filipino_word").notNull(),
  targetWord: text("target_word").notNull(),
  languageCode: text("language_code")
    .notNull()
    .references(() => languagesTable.code),
  meaning: text("meaning").notNull(),
  pronunciation: text("pronunciation").notNull(),
  exampleSentence: text("example_sentence").notNull(),
  usageNotes: text("usage_notes"),
});

export type Word = typeof wordsTable.$inferSelect;
export type InsertWord = typeof wordsTable.$inferInsert;

export const contributionsTable = pgTable("contributions", {
  id: serial("id").primaryKey(),
  word: text("word").notNull(),
  languageCode: text("language_code").notNull(),
  meaning: text("meaning").notNull(),
  filipinoEquivalent: text("filipino_equivalent"),
  status: text("status").notNull().default("pending"),
  submittedAt: text("submitted_at").notNull(),
  aiValidationNote: text("ai_validation_note"),
});

export type Contribution = typeof contributionsTable.$inferSelect;
export type InsertContribution = typeof contributionsTable.$inferInsert;

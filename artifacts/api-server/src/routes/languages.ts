import { Router } from "express";
import { db, languagesTable, wordsTable } from "@workspace/db";
import { sql } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const languages = await db.select().from(languagesTable);
    const wordCounts = await db
      .select({
        languageCode: wordsTable.languageCode,
        count: sql<number>`cast(count(*) as integer)`,
      })
      .from(wordsTable)
      .groupBy(wordsTable.languageCode);

    const countMap = new Map(wordCounts.map((w) => [w.languageCode, w.count]));

    const result = languages.map((lang) => ({
      id: lang.id,
      code: lang.code,
      name: lang.name,
      wordCount: countMap.get(lang.code) ?? 0,
    }));

    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Failed to list languages");
    res.status(500).json({ error: "Failed to list languages" });
  }
});

export default router;

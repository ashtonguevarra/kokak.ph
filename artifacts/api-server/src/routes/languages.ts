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
        count: sql<number>`CAST(COUNT(*) AS INTEGER)`,
      })
      .from(wordsTable)
      .groupBy(wordsTable.languageCode);

    const countMap = new Map(
      wordCounts.map(({ languageCode, count }) => [languageCode, count])
    );

    const response = languages.map((language) => ({
      id: language.id,
      code: language.code,
      name: language.name,
      wordCount: countMap.get(language.code) ?? 0,
    }));

    return res.status(200).json(response);
  } catch (error) {
    req.log.error({ error }, "Failed to fetch languages");

    return res.status(500).json({
      success: false,
      message: "Failed to fetch languages",
    });
  }
});

export default router;
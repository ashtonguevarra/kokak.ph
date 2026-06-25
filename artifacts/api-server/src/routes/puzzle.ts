import { Router } from "express";
import { db, wordsTable, languagesTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";
import { GetRandomPuzzleQueryParams, GetPuzzleByIdParams } from "@workspace/api-zod";

const router = Router();

router.get("/", async (req, res) => {
  const parsed = GetRandomPuzzleQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: "languageCode is required" });
    return;
  }

  const { languageCode } = parsed.data;

  try {
    const lang = await db
      .select()
      .from(languagesTable)
      .where(eq(languagesTable.code, languageCode))
      .limit(1);

    if (!lang.length) {
      res.status(404).json({ error: "Language not found" });
      return;
    }

    const words = await db
      .select()
      .from(wordsTable)
      .where(eq(wordsTable.languageCode, languageCode))
      .orderBy(sql`random()`)
      .limit(1);

    if (!words.length) {
      res.status(404).json({ error: "No words found for this language" });
      return;
    }

    const word = words[0];
    res.json({
      id: word.id,
      filipinoWord: word.filipinoWord,
      targetWord: word.targetWord,
      wordLength: word.targetWord.length,
      languageCode: word.languageCode,
      languageName: lang[0].name,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get puzzle");
    res.status(500).json({ error: "Failed to get puzzle" });
  }
});

router.get("/:id", async (req, res) => {
  const parsed = GetPuzzleByIdParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }

  const { id } = parsed.data;

  try {
    const words = await db
      .select()
      .from(wordsTable)
      .where(eq(wordsTable.id, id))
      .limit(1);

    if (!words.length) {
      res.status(404).json({ error: "Puzzle not found" });
      return;
    }

    const word = words[0];

    const lang = await db
      .select()
      .from(languagesTable)
      .where(eq(languagesTable.code, word.languageCode))
      .limit(1);

    res.json({
      id: word.id,
      filipinoWord: word.filipinoWord,
      targetWord: word.targetWord,
      wordLength: word.targetWord.length,
      languageCode: word.languageCode,
      languageName: lang[0]?.name ?? word.languageCode,
      meaning: word.meaning,
      pronunciation: word.pronunciation,
      exampleSentence: word.exampleSentence,
      usageNotes: word.usageNotes ?? null,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get puzzle by id");
    res.status(500).json({ error: "Failed to get puzzle" });
  }
});

export default router;

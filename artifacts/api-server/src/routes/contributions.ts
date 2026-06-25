import { Router } from "express";
import { db, contributionsTable } from "@workspace/db";
import { desc } from "drizzle-orm";
import { SubmitContributionBody } from "@workspace/api-zod";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const contributions = await db
      .select()
      .from(contributionsTable)
      .orderBy(desc(contributionsTable.id))
      .limit(20);

    res.json(
      contributions.map((c) => ({
        id: c.id,
        word: c.word,
        languageCode: c.languageCode,
        meaning: c.meaning,
        status: c.status,
        submittedAt: c.submittedAt,
        aiValidationNote: c.aiValidationNote ?? null,
      }))
    );
  } catch (err) {
    req.log.error({ err }, "Failed to list contributions");
    res.status(500).json({ error: "Failed to list contributions" });
  }
});

router.post("/", async (req, res) => {
  const parsed = SubmitContributionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
    return;
  }

  const { word, languageCode, meaning, filipinoEquivalent } = parsed.data;

  try {
    const inserted = await db
      .insert(contributionsTable)
      .values({
        word: word.trim(),
        languageCode: languageCode.trim(),
        meaning: meaning.trim(),
        filipinoEquivalent: filipinoEquivalent?.trim() ?? null,
        status: "pending",
        submittedAt: new Date().toISOString(),
        aiValidationNote: null,
      })
      .returning();

    const c = inserted[0];
    res.status(201).json({
      id: c.id,
      word: c.word,
      languageCode: c.languageCode,
      meaning: c.meaning,
      status: c.status,
      submittedAt: c.submittedAt,
      aiValidationNote: c.aiValidationNote ?? null,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to submit contribution");
    res.status(500).json({ error: "Failed to submit contribution" });
  }
});

export default router;

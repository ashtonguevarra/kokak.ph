import { Router } from "express";
import { askGemini } from "../services/gemini";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    const reply = await askGemini(message);

    res.json({ reply });
  } catch (error: any) {
    console.error("Gemini Error:", error);
    console.error("Status:", error?.status);
    console.error("Message:", error?.message);

    if (error?.response) {
      try {
        console.error(await error.response.text());
      } catch (error: any) {
  console.error("===== GEMINI ERROR =====");
  console.error(error);
  console.error("status:", error.status);
  console.error("message:", error.message);
  console.error("body:", error.response?.text);

  res.status(500).json({
    error: error.message,
    status: error.status,
  });
}
    }

    res.status(500).json({
      error: error?.message ?? "Gemini failed",
      status: error?.status,
    });
  }
});

export default router;
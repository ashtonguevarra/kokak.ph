import { Router, type IRouter } from "express";
import healthRouter from "./health";
import languagesRouter from "./languages";
import puzzleRouter from "./puzzle";
import contributionsRouter from "./contributions";
import chat from "./chat";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/languages", languagesRouter);
router.use("/puzzle", puzzleRouter);
router.use("/contributions", contributionsRouter);
router.use("/chat", chat);

export default router;

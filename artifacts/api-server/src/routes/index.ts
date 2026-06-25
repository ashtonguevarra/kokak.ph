import { Router, type IRouter } from "express";
import healthRouter from "./health";
import languagesRouter from "./languages";
import puzzleRouter from "./puzzle";
import contributionsRouter from "./contributions";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/languages", languagesRouter);
router.use("/puzzle", puzzleRouter);
router.use("/contributions", contributionsRouter);

export default router;

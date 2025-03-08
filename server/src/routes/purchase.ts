import { RequestHandler, Router } from "express";
import * as purchaseController from "../controllers/purchase";

const router = Router();

router.get("/", purchaseController.getPurchases as RequestHandler);

export default router;

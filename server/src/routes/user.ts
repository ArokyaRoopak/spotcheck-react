import { RequestHandler, Router } from "express";
import * as userController from "../controllers/user";

const router = Router();

// Define the login route
router.post("/login", userController.login as RequestHandler);
router.get("/verify", userController.verify as RequestHandler);

export default router;

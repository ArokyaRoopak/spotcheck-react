import { RequestHandler, Router } from "express";
import * as userController from "../controllers/user";

const router = Router();

// Im not checking user auth here
router.get("/", userController.getUsers as RequestHandler);
router.post("/login", userController.login as RequestHandler);
router.get("/verify", userController.verify as RequestHandler);

export default router;

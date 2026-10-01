import { Router } from "express";
import * as AuthController from "../controllers/authController.js";

const router = Router();

router.post("/login", AuthController.adminLogin);
router.get("/verify", AuthController.verifyAdmin);
router.get("/stats", AuthController.getStats);

export default router;

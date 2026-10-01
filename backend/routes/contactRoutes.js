import { Router } from "express";
import * as ContactController from "../controllers/contactController.js";

const router = Router();

// Contact Form Routes
router.get("/", ContactController.getAllContacts);
router.post("/", ContactController.submitContact);
router.patch("/:id/status", ContactController.updateContactStatus);
router.delete("/:id", ContactController.deleteContact);

export default router;

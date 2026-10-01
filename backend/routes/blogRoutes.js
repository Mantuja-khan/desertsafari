import { Router } from "express";
import * as BlogController from "../controllers/blogController.js";

const router = Router();

// Public & Admin Blog Routes
router.get("/", BlogController.getAllBlogs);
router.get("/admin/all", BlogController.getAdminAllBlogs);
router.get("/:identifier", BlogController.getBlogByIdentifier);
router.post("/", BlogController.createBlog);
router.put("/:id", BlogController.updateBlog);
router.delete("/:id", BlogController.deleteBlog);
router.post("/:id/like", BlogController.likeBlog);

export default router;

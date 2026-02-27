import express from "express";
import {
  createProject,
  getProjects,
  assignEmployee,
  updateProject,
  requestService,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getProjects);
router.post("/", protect, createProject);
router.put("/assign", protect, assignEmployee);
router.put("/:id", protect, updateProject);
router.post("/request", protect, requestService);

export default router;
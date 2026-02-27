import express from "express";
import {
  createProject,
  getProjects,
  updateProject,
  assignEmployee,
  requestService
} from "../controllers/projectController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/assign", verifyToken, assignEmployee);
router.post("/request", verifyToken, requestService);

router.post("/", verifyToken, createProject);
router.get("/", verifyToken, getProjects);
router.put("/:id", verifyToken, updateProject);

export default router;
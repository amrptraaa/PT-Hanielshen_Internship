import express from "express";
import { RoleController } from "../controllers/roleController.js";

const router = express.Router();

router.get("/", RoleController.getAll);
router.get("/:id", RoleController.getById);
router.post("/", RoleController.create);
router.put("/:id", RoleController.update);
router.delete("/:id", RoleController.delete);

export default router;

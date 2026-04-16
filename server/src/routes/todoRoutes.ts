import { Router } from "express";
import * as todoController from "../controllers/todoController.js";
import {
  validate,
  createTodoSchema,
  updateTodoSchema,
} from "../middlewares/validation.js";

const router = Router();

router.get("/", todoController.getAll);
router.get("/:id", todoController.getById);
router.post("/", validate(createTodoSchema), todoController.create);
router.put("/:id", validate(updateTodoSchema), todoController.update);
router.delete("/:id", todoController.remove);

export default router;

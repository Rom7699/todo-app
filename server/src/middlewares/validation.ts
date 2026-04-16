import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const createTodoSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
});

export const updateTodoSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  completed: z.boolean().optional(),
});

export function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        data: null,
        error: result.error.errors.map((e) => e.message).join(", "),
      });
      return;
    }
    next();
  };
}

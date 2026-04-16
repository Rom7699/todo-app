import { Request, Response } from "express";
import * as todoService from "../services/todoService.js";

export function getAll(_req: Request, res: Response): void {
  const todos = todoService.getAllTodos();
  res.json({ data: todos, error: null });
}

export function getById(req: Request, res: Response): void {
  const todo = todoService.getTodoById(req.params.id);
  if (!todo) {
    res.status(404).json({ data: null, error: "Todo not found" });
    return;
  }
  res.json({ data: todo, error: null });
}

export function create(req: Request, res: Response): void {
  const todo = todoService.createTodo(req.body.title);
  res.status(201).json({ data: todo, error: null });
}

export function update(req: Request, res: Response): void {
  const todo = todoService.updateTodo(req.params.id, req.body);
  if (!todo) {
    res.status(404).json({ data: null, error: "Todo not found" });
    return;
  }
  res.json({ data: todo, error: null });
}

export function remove(req: Request, res: Response): void {
  const deleted = todoService.deleteTodo(req.params.id);
  if (!deleted) {
    res.status(404).json({ data: null, error: "Todo not found" });
    return;
  }
  res.status(204).send();
}

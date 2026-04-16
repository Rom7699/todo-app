import { useState, useCallback } from "react";
import type { Todo, FilterType } from "./types";

function loadFromStorage(): Todo[] {
  try {
    const stored = localStorage.getItem("todos");
    return stored ? (JSON.parse(stored) as Todo[]) : [];
  } catch {
    return [];
  }
}

function saveToStorage(todos: Todo[]): void {
  try {
    localStorage.setItem("todos", JSON.stringify(todos));
  } catch {
    // ignore storage errors
  }
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadFromStorage);
  const [filter, setFilter] = useState<FilterType>("all");

  const updateTodos = useCallback((next: Todo[]) => {
    setTodos(next);
    saveToStorage(next);
  }, []);

  const addTodo = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const todo: Todo = {
        id: crypto.randomUUID(),
        text: trimmed,
        completed: false,
        createdAt: Date.now(),
      };
      updateTodos([todo, ...todos]);
    },
    [todos, updateTodos]
  );

  const toggleTodo = useCallback(
    (id: string) => {
      updateTodos(
        todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    },
    [todos, updateTodos]
  );

  const deleteTodo = useCallback(
    (id: string) => {
      updateTodos(todos.filter((t) => t.id !== id));
    },
    [todos, updateTodos]
  );

  const editTodo = useCallback(
    (id: string, text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      updateTodos(
        todos.map((t) => (t.id === id ? { ...t, text: trimmed } : t))
      );
    },
    [todos, updateTodos]
  );

  const clearCompleted = useCallback(() => {
    updateTodos(todos.filter((t) => !t.completed));
  }, [todos, updateTodos]);

  const filteredTodos = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const hasCompleted = todos.some((t) => t.completed);

  return {
    todos: filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    hasCompleted,
  };
}

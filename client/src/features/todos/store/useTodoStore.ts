import { create } from "zustand";
import * as todosApi from "@/features/todos/api/todosApi";
import type { FilterType, Todo } from "@/features/todos/types";

interface TodoState {
  todos: Todo[];
  filter: FilterType;
  isLoading: boolean;
  isMutating: boolean;
  error: string | null;
  setFilter: (filter: FilterType) => void;
  loadTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  editTodo: (id: string, title: string) => Promise<void>;
  clearCompleted: () => Promise<void>;
}

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [],
  filter: "all",
  isLoading: false,
  isMutating: false,
  error: null,
  setFilter: (filter) => set({ filter }),
  loadTodos: async () => {
    set({ isLoading: true, error: null });
    try {
      const todos = await todosApi.getTodos();
      set({ todos, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to load todos",
      });
    }
  },
  addTodo: async (title) => {
    const trimmed = title.trim();
    if (!trimmed) {
      return;
    }

    set({ isMutating: true, error: null });
    try {
      const createdTodo = await todosApi.createTodo(trimmed);
      set((state) => ({ todos: [createdTodo, ...state.todos], isMutating: false }));
    } catch (error) {
      set({
        isMutating: false,
        error: error instanceof Error ? error.message : "Failed to create todo",
      });
    }
  },
  toggleTodo: async (id) => {
    const todo = get().todos.find((item) => item.id === id);
    if (!todo) {
      return;
    }

    set({ isMutating: true, error: null });
    try {
      const updatedTodo = await todosApi.updateTodo(id, { completed: !todo.completed });
      set((state) => ({
        todos: state.todos.map((item) => (item.id === id ? updatedTodo : item)),
        isMutating: false,
      }));
    } catch (error) {
      set({
        isMutating: false,
        error: error instanceof Error ? error.message : "Failed to update todo",
      });
    }
  },
  deleteTodo: async (id) => {
    set({ isMutating: true, error: null });
    try {
      await todosApi.deleteTodo(id);
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
        isMutating: false,
      }));
    } catch (error) {
      set({
        isMutating: false,
        error: error instanceof Error ? error.message : "Failed to delete todo",
      });
    }
  },
  editTodo: async (id, title) => {
    const trimmed = title.trim();
    if (!trimmed) {
      return;
    }

    set({ isMutating: true, error: null });
    try {
      const updatedTodo = await todosApi.updateTodo(id, { title: trimmed });
      set((state) => ({
        todos: state.todos.map((item) => (item.id === id ? updatedTodo : item)),
        isMutating: false,
      }));
    } catch (error) {
      set({
        isMutating: false,
        error: error instanceof Error ? error.message : "Failed to edit todo",
      });
    }
  },
  clearCompleted: async () => {
    const completedIds = get()
      .todos.filter((todo) => todo.completed)
      .map((todo) => todo.id);

    if (completedIds.length === 0) {
      return;
    }

    set({ isMutating: true, error: null });
    try {
      await Promise.all(completedIds.map((id) => todosApi.deleteTodo(id)));
      set((state) => ({
        todos: state.todos.filter((todo) => !todo.completed),
        isMutating: false,
      }));
    } catch (error) {
      set({
        isMutating: false,
        error: error instanceof Error ? error.message : "Failed to clear completed todos",
      });
    }
  },
}));

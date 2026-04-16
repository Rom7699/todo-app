import { useMemo } from "react";
import { useTodoStore } from "@/features/todos/store/useTodoStore";

export function useTodos() {
  const todos = useTodoStore((state) => state.todos);
  const filter = useTodoStore((state) => state.filter);
  const isLoading = useTodoStore((state) => state.isLoading);
  const isMutating = useTodoStore((state) => state.isMutating);
  const error = useTodoStore((state) => state.error);
  const setFilter = useTodoStore((state) => state.setFilter);
  const loadTodos = useTodoStore((state) => state.loadTodos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const editTodo = useTodoStore((state) => state.editTodo);
  const clearCompleted = useTodoStore((state) => state.clearCompleted);

  const filteredTodos = useMemo(
    () =>
      todos.filter((todo) => {
        if (filter === "active") {
          return !todo.completed;
        }
        if (filter === "completed") {
          return todo.completed;
        }
        return true;
      }),
    [filter, todos]
  );

  const activeCount = useMemo(() => todos.filter((todo) => !todo.completed).length, [todos]);
  const hasCompleted = useMemo(() => todos.some((todo) => todo.completed), [todos]);

  return {
    allTodos: todos,
    todos: filteredTodos,
    filter,
    isLoading,
    isMutating,
    error,
    setFilter,
    loadTodos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    hasCompleted,
  };
}

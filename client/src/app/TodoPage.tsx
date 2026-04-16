import { useEffect } from "react";
import { useTodos } from "@/features/todos/useTodos";
import { AddTodoForm } from "@/features/todos/components/AddTodoForm";
import { TodoList } from "@/features/todos/components/TodoList";
import { TodoFooter } from "@/features/todos/components/TodoFooter";

export function TodoPage() {
  const {
    allTodos,
    todos,
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
  } = useTodos();

  useEffect(() => {
    void loadTodos();
  }, [loadTodos]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-8 tracking-tight">
          Todo
        </h1>

        <AddTodoForm onAdd={addTodo} disabled={isMutating} />

        {error ? (
          <p className="mb-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </p>
        ) : null}

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          {isLoading ? (
            <div className="py-12 text-center text-sm text-gray-400 dark:text-gray-500">Loading todos...</div>
          ) : (
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
              disabled={isMutating}
            />
          )}
          <TodoFooter
            activeCount={activeCount}
            hasCompleted={hasCompleted}
            filter={filter}
            onFilterChange={setFilter}
            onClearCompleted={clearCompleted}
            disabled={isMutating || isLoading || allTodos.length === 0}
          />
        </div>

        <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-600">
          Double-click a todo to edit it
        </p>
      </div>
    </div>
  );
}

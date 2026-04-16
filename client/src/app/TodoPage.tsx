import { useTodos } from "@/features/todos/useTodos";
import { AddTodoForm } from "@/features/todos/components/AddTodoForm";
import { TodoList } from "@/features/todos/components/TodoList";
import { TodoFooter } from "@/features/todos/components/TodoFooter";

export function TodoPage() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    hasCompleted,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-8 tracking-tight">
          Todo
        </h1>

        <AddTodoForm onAdd={addTodo} />

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
          <TodoFooter
            activeCount={activeCount}
            hasCompleted={hasCompleted}
            filter={filter}
            onFilterChange={setFilter}
            onClearCompleted={clearCompleted}
          />
        </div>

        <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-600">
          Double-click a todo to edit it
        </p>
      </div>
    </div>
  );
}

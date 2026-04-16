import type { Todo } from "../types";
import { TodoItem } from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
  onEdit: (id: string, text: string) => void | Promise<void>;
  disabled?: boolean;
}

export function TodoList({ todos, onToggle, onDelete, onEdit, disabled = false }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="py-12 text-center text-gray-400 dark:text-gray-500 text-sm">
        No todos here.
      </div>
    );
  }

  return (
    <ul className="divide-y-0">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            disabled={disabled}
          />
        ))}
      </ul>
  );
}

import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import type { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void | Promise<void>;
  onDelete: (id: string) => void | Promise<void>;
  onEdit: (id: string, text: string) => void | Promise<void>;
  disabled?: boolean;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit, disabled = false }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  function handleEditCommit() {
    if (editValue.trim()) {
      void onEdit(todo.id, editValue);
    } else {
      setEditValue(todo.title);
    }
    setEditing(false);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") handleEditCommit();
    if (e.key === "Escape") {
      setEditValue(todo.title);
      setEditing(false);
    }
  }

  return (
    <li className="group flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-700/50 last:border-0">
      <button
        onClick={() => {
          void onToggle(todo.id);
        }}
        disabled={disabled}
        aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-1 dark:focus:ring-offset-gray-800 ${
          todo.completed
            ? "bg-violet-600 border-violet-600"
            : "border-gray-300 dark:border-gray-600 hover:border-violet-400"
        }`}
      >
        {todo.completed && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {editing ? (
        <input
          ref={inputRef}
          value={editValue}
          disabled={disabled}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleEditCommit}
          onKeyDown={handleKeyDown}
          className="flex-1 px-2 py-0.5 text-sm rounded border border-violet-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      ) : (
        <span
          onDoubleClick={() => !disabled && setEditing(true)}
          className={`flex-1 text-sm select-none cursor-default ${
            todo.completed
              ? "line-through text-gray-400 dark:text-gray-500"
              : "text-gray-800 dark:text-gray-200"
          }`}
          title="Double-click to edit"
        >
          {todo.title}
        </span>
      )}

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            disabled={disabled}
            aria-label="Edit todo"
            className="p-1 rounded text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-1 dark:focus:ring-offset-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        )}
        <button
          onClick={() => {
            void onDelete(todo.id);
          }}
          disabled={disabled}
          aria-label="Delete todo"
          className="p-1 rounded text-gray-400 hover:text-red-500 dark:hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 dark:focus:ring-offset-gray-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </li>
  );
}

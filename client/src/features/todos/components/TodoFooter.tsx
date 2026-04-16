import type { FilterType } from "../types";

interface TodoFooterProps {
  activeCount: number;
  hasCompleted: boolean;
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
  onClearCompleted: () => void | Promise<void>;
  disabled?: boolean;
}

const FILTERS: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];

export function TodoFooter({
  activeCount,
  hasCompleted,
  filter,
  onFilterChange,
  onClearCompleted,
  disabled = false,
}: TodoFooterProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-xs text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-700">
      <span>
        {activeCount} {activeCount === 1 ? "item" : "items"} left
      </span>

      <div className="flex items-center gap-1">
        {FILTERS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => onFilterChange(value)}
            disabled={disabled}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 ${
              filter === value
                ? "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300"
                : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {hasCompleted ? (
        <button
          onClick={() => {
            void onClearCompleted();
          }}
          disabled={disabled}
          className="text-xs hover:text-red-500 dark:hover:text-red-400 transition-colors focus:outline-none focus:underline"
        >
          Clear completed
        </button>
      ) : (
        <span className="invisible text-xs">Clear completed</span>
      )}
    </div>
  );
}

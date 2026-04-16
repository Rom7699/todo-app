import type { Todo } from "../types";

interface ApiResponse<T> {
  data: T;
  error: string | null;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    ...init,
  });

  const payload = (await response.json().catch(() => null)) as ApiResponse<T> | null;

  if (!response.ok) {
    const apiError = payload?.error;
    throw new Error(apiError || `Request failed with status ${response.status}`);
  }

  if (!payload) {
    throw new Error("Invalid API response");
  }

  return payload.data;
}

export function getTodos(): Promise<Todo[]> {
  return request<Todo[]>("/todos");
}

export function createTodo(title: string): Promise<Todo> {
  return request<Todo>("/todos", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}

export function updateTodo(
  id: string,
  updates: { title?: string; completed?: boolean }
): Promise<Todo> {
  return request<Todo>(`/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}

export async function deleteTodo(id: string): Promise<void> {
  const response = await fetch(`${API_BASE}/todos/${id}`, { method: "DELETE" });
  if (!response.ok && response.status !== 204) {
    const payload = (await response.json().catch(() => null)) as ApiResponse<null> | null;
    throw new Error(payload?.error || `Delete failed with status ${response.status}`);
  }
}

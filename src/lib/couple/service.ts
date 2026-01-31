import type { Couple } from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

const request = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
};

export const coupleService = {
  async get(): Promise<Couple | null> {
    return request<Couple | null>("/couple");
  },
  async upsert(couple: Couple): Promise<Couple> {
    return request<Couple>("/couple", {
      method: "PUT",
      body: JSON.stringify(couple),
    });
  },
};

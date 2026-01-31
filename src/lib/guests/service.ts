import type {
  Guest,
  GuestCreateInput,
  GuestUpdateInput,
  GuestStatus,
} from "./types";

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

export const guestService = {
  async list(): Promise<Guest[]> {
    return request<Guest[]>("/guests");
  },
  async create(input: GuestCreateInput): Promise<Guest> {
    return request<Guest>("/guests", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },
  async update(input: GuestUpdateInput): Promise<Guest | null> {
    const { id, ...payload } = input;
    return request<Guest>(`/guests/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  },
  async updateStatus(ids: number[], status: GuestStatus): Promise<Guest[]> {
    const updated = await Promise.all(
      ids.map((id) =>
        request<Guest>(`/guests/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ status }),
        }),
      ),
    );
    return updated;
  },
  async delete(ids: number[]): Promise<void> {
    await Promise.all(
      ids.map((id) =>
        request<void>(`/guests/${id}`, {
          method: "DELETE",
        }),
      ),
    );
  },
};

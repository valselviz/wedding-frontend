import type {
  GuestGroup,
  GuestGroupWithMembers,
  GuestGroupCreateInput,
  GuestGroupUpdateInput,
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

export const groupService = {
  async list(): Promise<GuestGroup[]> {
    return request<GuestGroup[]>("/groups");
  },
  async getById(id: number): Promise<GuestGroupWithMembers> {
    return request<GuestGroupWithMembers>(`/groups/${id}`);
  },
  async create(input: GuestGroupCreateInput): Promise<GuestGroup> {
    return request<GuestGroup>("/groups", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },
  async update(input: GuestGroupUpdateInput): Promise<GuestGroup> {
    const { id, ...payload } = input;
    return request<GuestGroup>(`/groups/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  },
  async delete(id: number): Promise<void> {
    return request<void>(`/groups/${id}`, {
      method: "DELETE",
    });
  },
  async addMembers(groupId: number, guestIds: number[]): Promise<GuestGroupWithMembers> {
    return request<GuestGroupWithMembers>(`/groups/${groupId}/members`, {
      method: "POST",
      body: JSON.stringify({ guestIds }),
    });
  },
  async removeMember(groupId: number, guestId: number): Promise<void> {
    return request<void>(`/groups/${groupId}/members/${guestId}`, {
      method: "DELETE",
    });
  },
};

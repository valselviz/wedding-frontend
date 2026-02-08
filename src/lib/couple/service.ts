import type { Couple } from "./types";

const COUPLE_KEY = "wedding-couple";

export const coupleService = {
  async get(): Promise<Couple | null> {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(COUPLE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Couple;
    } catch {
      return null;
    }
  },
  async upsert(couple: Couple): Promise<Couple> {
    if (typeof window === "undefined") return couple;
    localStorage.setItem(COUPLE_KEY, JSON.stringify(couple));
    return couple;
  },
};

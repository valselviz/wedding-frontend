import type { Couple } from "./types";

const COUPLE_KEY = "wedding:couple";
const COUPLE_SKIP_KEY = "wedding:couple:skipped";

export const loadCouple = (): Couple | null => {
  if (typeof window === "undefined") {
    return null;
  }
  const raw = window.localStorage.getItem(COUPLE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Couple;
    if (!parsed?.bride_name || !parsed?.groom_name) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

export const saveCouple = (couple: Couple) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(COUPLE_KEY, JSON.stringify(couple));
  window.localStorage.removeItem(COUPLE_SKIP_KEY);
};

export const clearCouple = () => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(COUPLE_KEY);
};

export const loadCoupleSetupSkipped = (): boolean => {
  if (typeof window === "undefined") {
    return false;
  }
  return window.localStorage.getItem(COUPLE_SKIP_KEY) === "true";
};

export const saveCoupleSetupSkipped = () => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(COUPLE_SKIP_KEY, "true");
};

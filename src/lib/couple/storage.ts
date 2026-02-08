const COUPLE_SKIPPED_KEY = "wedding-couple-setup-skipped";

export function loadCoupleSetupSkipped(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(COUPLE_SKIPPED_KEY) === "true";
}

export function saveCoupleSetupSkipped(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(COUPLE_SKIPPED_KEY, "true");
}

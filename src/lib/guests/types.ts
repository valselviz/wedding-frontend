export type GuestSide = "BRIDE" | "GROOM";
export type GuestType = "MAIN_GUEST" | "PLUS_ONE" | "BRIDE" | "GROOM";
export type GuestStatus = "INVITED" | "CONFIRMED" | "DECLINED";
export type AgeRange = "ADULT" | "CHILD" | "BABY";
export type Gender = "FEMALE" | "MALE";

export interface Guest {
  id: number;
  full_name: string;
  guest_type: GuestType;
  main_guest_id: number | null;
  side: GuestSide | null;
  age_range: AgeRange;
  notes: string | null;
  status: GuestStatus;
  gender?: Gender;
  avatar_key?: string | null;
}

export type GuestCreateInput = Omit<Guest, "id">;
export type GuestUpdateInput = Partial<GuestCreateInput> & { id: number };

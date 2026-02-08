export type GuestType = "MAIN_GUEST" | "PLUS_ONE" | "BRIDE" | "GROOM";
export type GuestSide = "BRIDE" | "GROOM";
export type AgeRange = "ADULT" | "CHILD" | "BABY";
export type GuestStatus = "INVITED" | "CONFIRMED" | "DECLINED";

export type Guest = {
  id: number;
  full_name: string;
  guest_type: GuestType;
  main_guest_id: number | null;
  side: GuestSide | null;
  age_range: AgeRange;
  notes: string | null;
  status: GuestStatus;
};

export type GuestCreateInput = {
  full_name: string;
  guest_type: GuestType;
  main_guest_id: number | null;
  side: GuestSide | null;
  age_range: AgeRange;
  notes: string | null;
  status: GuestStatus;
};

export type GuestUpdateInput = GuestCreateInput & { id: number };

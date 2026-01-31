"use client";

import type { GuestSide, GuestType, GuestStatus } from "@/lib/guests/types";

export type GuestFiltersValue = {
  side: GuestSide | "all";
  type: GuestType | "all";
  status: GuestStatus | "all";
  order: "name" | "notes";
};

type GuestFiltersProps = {
  value: GuestFiltersValue;
  onChange: (next: GuestFiltersValue) => void;
};

export default function GuestFilters({ value, onChange }: GuestFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        className="h-10 rounded-lg border border-zinc-300 bg-white px-3 text-sm"
        value={value.side}
        onChange={(event) =>
          onChange({ ...value, side: event.target.value as GuestFiltersValue["side"] })
        }
      >
        <option value="all">Todos los lados</option>
        <option value="BRIDE">Novia</option>
        <option value="GROOM">Novio</option>
      </select>
      <select
        className="h-10 rounded-lg border border-zinc-300 bg-white px-3 text-sm"
        value={value.type}
        onChange={(event) =>
          onChange({ ...value, type: event.target.value as GuestFiltersValue["type"] })
        }
      >
        <option value="all">Todos los tipos</option>
        <option value="MAIN_GUEST">Invitado principal</option>
        <option value="PLUS_ONE">Acompañante</option>
        <option value="BRIDE">Novia</option>
        <option value="GROOM">Novio</option>
      </select>
      <select
        className="h-10 rounded-lg border border-zinc-300 bg-white px-3 text-sm"
        value={value.status}
        onChange={(event) =>
          onChange({
            ...value,
            status: event.target.value as GuestFiltersValue["status"],
          })
        }
      >
        <option value="all">Todos los estados</option>
        <option value="INVITED">Invitado</option>
        <option value="CONFIRMED">Confirmado</option>
        <option value="DECLINED">Declinado</option>
      </select>
      <select
        className="h-10 rounded-lg border border-zinc-300 bg-white px-3 text-sm"
        value={value.order}
        onChange={(event) =>
          onChange({ ...value, order: event.target.value as GuestFiltersValue["order"] })
        }
      >
        <option value="name">Orden: Nombre</option>
        <option value="notes">Orden: Notas</option>
      </select>
    </div>
  );
}

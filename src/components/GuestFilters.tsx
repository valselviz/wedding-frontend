"use client";

export type GuestFiltersValue = {
  side: "all" | "BRIDE" | "GROOM";
  type: "all" | "MAIN_GUEST" | "PLUS_ONE" | "BRIDE" | "GROOM";
  status: "all" | "INVITED" | "CONFIRMED" | "DECLINED";
  order: "name" | "notes";
};

type GuestFiltersProps = {
  value: GuestFiltersValue;
  onChange: (value: GuestFiltersValue) => void;
};

export default function GuestFilters({ value, onChange }: GuestFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <select
        value={value.side}
        onChange={(e) =>
          onChange({ ...value, side: e.target.value as GuestFiltersValue["side"] })
        }
        className="h-10 rounded-lg border border-zinc-300 px-3 text-sm"
      >
        <option value="all">Todos los lados</option>
        <option value="BRIDE">Novia</option>
        <option value="GROOM">Novio</option>
      </select>
      <select
        value={value.type}
        onChange={(e) =>
          onChange({ ...value, type: e.target.value as GuestFiltersValue["type"] })
        }
        className="h-10 rounded-lg border border-zinc-300 px-3 text-sm"
      >
        <option value="all">Todos los tipos</option>
        <option value="MAIN_GUEST">Principal</option>
        <option value="PLUS_ONE">Acompañante</option>
        <option value="BRIDE">Novia</option>
        <option value="GROOM">Novio</option>
      </select>
      <select
        value={value.status}
        onChange={(e) =>
          onChange({
            ...value,
            status: e.target.value as GuestFiltersValue["status"],
          })
        }
        className="h-10 rounded-lg border border-zinc-300 px-3 text-sm"
      >
        <option value="all">Todos los estados</option>
        <option value="INVITED">Invitado</option>
        <option value="CONFIRMED">Confirmado</option>
        <option value="DECLINED">Declinado</option>
      </select>
      <select
        value={value.order}
        onChange={(e) =>
          onChange({
            ...value,
            order: e.target.value as GuestFiltersValue["order"],
          })
        }
        className="h-10 rounded-lg border border-zinc-300 px-3 text-sm"
      >
        <option value="name">Ordenar por nombre</option>
        <option value="notes">Ordenar por notas</option>
      </select>
    </div>
  );
}

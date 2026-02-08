"use client";

import { useEffect, useRef } from "react";
import type { Guest } from "@/lib/guests/types";

type GuestTableProps = {
  guests: Guest[];
  selectedIds: number[];
  onToggleSelect: (id: number) => void;
  onToggleAll: (selectAll: boolean) => void;
};

const statusLabels: Record<string, string> = {
  INVITED: "Invitado",
  CONFIRMED: "Confirmado",
  DECLINED: "Declinado",
};

const sideLabels: Record<string, string> = {
  BRIDE: "Novia",
  GROOM: "Novio",
};

const typeLabels: Record<string, string> = {
  MAIN_GUEST: "Principal",
  PLUS_ONE: "Acompañante",
  BRIDE: "Novia",
  GROOM: "Novio",
};

export default function GuestTable({
  guests,
  selectedIds,
  onToggleSelect,
  onToggleAll,
}: GuestTableProps) {
  const allSelected =
    guests.length > 0 && guests.every((g) => selectedIds.includes(g.id));
  const someSelected = selectedIds.length > 0;
  const checkAllRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkAllRef.current) {
      checkAllRef.current.indeterminate = someSelected && !allSelected;
    }
  }, [someSelected, allSelected]);

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-zinc-200 bg-zinc-50">
          <tr>
            <th className="p-4">
              <input
                ref={checkAllRef}
                type="checkbox"
                checked={allSelected}
                onChange={(e) => onToggleAll(e.target.checked)}
                className="h-4 w-4 rounded border-zinc-300"
              />
            </th>
            <th className="p-4 font-semibold text-zinc-700">Nombre</th>
            <th className="p-4 font-semibold text-zinc-700">Lado</th>
            <th className="p-4 font-semibold text-zinc-700">Tipo</th>
            <th className="p-4 font-semibold text-zinc-700">Estado</th>
            <th className="p-4 font-semibold text-zinc-700">Notas</th>
          </tr>
        </thead>
        <tbody>
          {guests.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="p-8 text-center text-zinc-500"
              >
                No hay invitados. Añade el primero con "Nuevo invitado".
              </td>
            </tr>
          ) : (
            guests.map((guest) => (
              <tr
                key={guest.id}
                className="border-b border-zinc-100 transition hover:bg-zinc-50"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(guest.id)}
                    onChange={() => onToggleSelect(guest.id)}
                    className="h-4 w-4 rounded border-zinc-300"
                  />
                </td>
                <td className="p-4 font-medium text-zinc-900">
                  {guest.full_name}
                </td>
                <td className="p-4 text-zinc-600">
                  {guest.side ? sideLabels[guest.side] ?? guest.side : "-"}
                </td>
                <td className="p-4 text-zinc-600">
                  {typeLabels[guest.guest_type] ?? guest.guest_type}
                </td>
                <td className="p-4">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      guest.status === "CONFIRMED"
                        ? "bg-emerald-100 text-emerald-800"
                        : guest.status === "DECLINED"
                          ? "bg-red-100 text-red-800"
                          : "bg-zinc-100 text-zinc-700"
                    }`}
                  >
                    {statusLabels[guest.status] ?? guest.status}
                  </span>
                </td>
                <td className="p-4 text-zinc-500">
                  {guest.notes ?? "-"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

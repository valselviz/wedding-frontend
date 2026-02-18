"use client";

import type { GuestGroup } from "@/lib/groups/types";
import { CATEGORY_LABELS } from "@/lib/groups/types";

type GroupTableProps = {
  groups: GuestGroup[];
  onEdit: (group: GuestGroup) => void;
  onDelete: (group: GuestGroup) => void;
  onAddMembers: (group: GuestGroup) => void;
};

export default function GroupTable({
  groups,
  onEdit,
  onDelete,
  onAddMembers,
}: GroupTableProps) {
  const getMemberCount = (group: GuestGroup) => {
    return group.members?.length ?? 0;
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500">
          <tr>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Categoría</th>
            <th className="px-4 py-3">Miembros</th>
            <th className="px-4 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 text-zinc-700">
          {groups.map((group) => (
            <tr key={group.id} className="hover:bg-zinc-50">
              <td className="px-4 py-3 font-medium text-zinc-900">
                {group.name}
              </td>
              <td className="px-4 py-3">
                {group.category ? (
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-700">
                    {CATEGORY_LABELS[group.category as keyof typeof CATEGORY_LABELS] ?? group.category}
                  </span>
                ) : (
                  <span className="text-zinc-400">—</span>
                )}
              </td>
              <td className="px-4 py-3">
                <span className="text-zinc-600">{getMemberCount(group)}</span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onAddMembers(group)}
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50"
                  >
                    Miembros
                  </button>
                  <button
                    type="button"
                    onClick={() => onEdit(group)}
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(group)}
                    className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50"
                  >
                    Borrar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {groups.length === 0 && (
        <div className="px-6 py-10 text-center text-sm text-zinc-500">
          No hay grupos. Crea el primero con "Crear grupo".
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { getAvatarUrl } from "@/lib/avatars";
import type { GuestGroupWithMembers } from "@/lib/groups/types";
import type { Guest } from "@/lib/guests/types";

type AddMembersModalProps = {
  open: boolean;
  group: GuestGroupWithMembers | null;
  allGuests: Guest[];
  onClose: () => void;
  onAddMembers: (guestIds: number[]) => void;
  onRemoveMember: (guestId: number) => void;
};

export default function AddMembersModal({
  open,
  group,
  allGuests,
  onClose,
  onAddMembers,
  onRemoveMember,
}: AddMembersModalProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    if (open && group) {
      // Initialize with current group members
      const currentMemberIds = group.members.map((m) => m.guest.id);
      setSelectedIds(currentMemberIds);
    }
  }, [open, group]);

  if (!open || !group) return null;

  const currentMemberIds = new Set(group.members.map((m) => m.guest.id));
  const availableGuests = allGuests.filter((g) => !currentMemberIds.has(g.id));

  const handleToggleGuest = (guestId: number) => {
    setSelectedIds((prev) =>
      prev.includes(guestId)
        ? prev.filter((id) => id !== guestId)
        : [...prev, guestId],
    );
  };

  const handleAddSelected = () => {
    const newIds = selectedIds.filter((id) => !currentMemberIds.has(id));
    if (newIds.length > 0) {
      onAddMembers(newIds);
    }
    setSelectedIds(Array.from(currentMemberIds));
  };

  const handleRemove = (guestId: number) => {
    onRemoveMember(guestId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-4xl max-h-[90vh] rounded-2xl bg-white p-6 shadow-lg flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">
              Miembros: {group.name}
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              {group.members.length} miembro(s) actual(es)
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-semibold text-zinc-500 hover:text-zinc-700"
          >
            Cerrar
          </button>
        </div>

        {/* Miembros actuales */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-zinc-700 mb-3">
            Miembros del grupo
          </h3>
          <div className="flex flex-wrap gap-2">
            {group.members.length === 0 ? (
              <p className="text-sm text-zinc-400">No hay miembros</p>
            ) : (
              group.members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1.5"
                >
                  {member.guest.avatar_key ? (
                    <img
                      src={getAvatarUrl(member.guest.avatar_key)}
                      alt={member.guest.full_name}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-zinc-200" />
                  )}
                  <span className="text-xs font-medium text-zinc-700">
                    {member.guest.full_name}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemove(member.guest.id)}
                    className="ml-1 text-zinc-400 hover:text-red-600"
                    title="Quitar del grupo"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Lista de invitados disponibles */}
        <div className="flex-1 overflow-y-auto mb-6">
          <h3 className="text-sm font-semibold text-zinc-700 mb-3">
            Agregar invitados
          </h3>
          <div className="space-y-2">
            {availableGuests.length === 0 ? (
              <p className="text-sm text-zinc-400">
                Todos los invitados ya están en el grupo
              </p>
            ) : (
              availableGuests.map((guest) => (
                <label
                  key={guest.id}
                  className="flex items-center gap-3 rounded-lg border border-zinc-200 p-3 hover:bg-zinc-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(guest.id)}
                    onChange={() => handleToggleGuest(guest.id)}
                    className="h-4 w-4 rounded border-zinc-300"
                  />
                  {guest.avatar_key ? (
                    <img
                      src={getAvatarUrl(guest.avatar_key)}
                      alt={guest.full_name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-zinc-100" />
                  )}
                  <span className="text-sm font-medium text-zinc-900">
                    {guest.full_name}
                  </span>
                </label>
              ))
            )}
          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end border-t border-zinc-200 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-full border border-zinc-300 px-5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400"
          >
            Cerrar
          </button>
          <button
            type="button"
            onClick={handleAddSelected}
            disabled={
              selectedIds.filter((id) => !currentMemberIds.has(id)).length === 0
            }
            className="h-11 rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Agregar seleccionados (
            {selectedIds.filter((id) => !currentMemberIds.has(id)).length})
          </button>
        </div>
      </div>
    </div>
  );
}

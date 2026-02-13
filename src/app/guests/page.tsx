"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import BulkActions from "@/components/BulkActions";
import CoupleSetupModal from "@/components/CoupleSetupModal";
import GuestFilters, { GuestFiltersValue } from "@/components/GuestFilters";
import GuestModal from "@/components/GuestModal";
import GuestTable from "@/components/GuestTable";
import {
  loadCoupleSetupSkipped,
  saveCoupleSetupSkipped,
} from "@/lib/couple/storage";
import { coupleService } from "@/lib/couple/service";
import type { Couple } from "@/lib/couple/types";
import { guestService } from "@/lib/guests/service";
import type { Guest, GuestCreateInput, GuestStatus } from "@/lib/guests/types";

const defaultFilters: GuestFiltersValue = {
  side: "all",
  type: "all",
  status: "all",
  plusOne: "all",
  order: "name",
};

export default function GuestsPage() {
  const searchParams = useSearchParams();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filters, setFilters] = useState<GuestFiltersValue>(defaultFilters);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);
  const [couple, setCouple] = useState<Couple | null>(null);
  const [isCoupleModalOpen, setIsCoupleModalOpen] = useState(false);
  const [isCoupleLoading, setIsCoupleLoading] = useState(true);

  useEffect(() => {
    guestService.list().then(setGuests);
  }, []);

  useEffect(() => {
    const shouldSetup = searchParams.get("setup") === "couple";
    const skipped = loadCoupleSetupSkipped();
    coupleService
      .get()
      .then((storedCouple) => {
        setCouple(storedCouple);
        if (!storedCouple && (shouldSetup || !skipped)) {
          setIsCoupleModalOpen(true);
        }
      })
      .catch(() => {
        if (shouldSetup || !skipped) {
          setIsCoupleModalOpen(true);
        }
      })
      .finally(() => setIsCoupleLoading(false));
  }, [searchParams]);

  const filteredGuests = useMemo(() => {
    const filtered = guests.filter((guest) => {
      if (filters.side !== "all" && guest.side !== filters.side) {
        return false;
      }
      if (filters.type !== "all" && guest.guest_type !== filters.type) {
        return false;
      }
      if (filters.status !== "all" && guest.status !== filters.status) {
        return false;
      }
      if (filters.plusOne === "only" && guest.guest_type !== "PLUS_ONE") {
        return false;
      }
      return true;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (filters.order === "notes") {
        return (a.notes ?? "").localeCompare(b.notes ?? "");
      }
      return a.full_name.localeCompare(b.full_name);
    });

    return sorted;
  }, [guests, filters]);

  const mainGuests = useMemo(
    () => guests.filter((guest) => guest.guest_type === "MAIN_GUEST"),
    [guests],
  );

  const mainGuestNameById = useMemo(
    () =>
      mainGuests.reduce<Record<number, string>>((acc, guest) => {
        acc[guest.id] = guest.full_name;
        return acc;
      }, {}),
    [mainGuests],
  );

  const handleToggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleToggleAll = (selectAll: boolean) => {
    setSelectedIds(selectAll ? filteredGuests.map((guest) => guest.id) : []);
  };

  const openCreate = () => {
    setEditingGuest(null);
    setModalOpen(true);
  };

  const openEdit = () => {
    if (selectedIds.length === 0) return;
    const guest = guests.find((item) => item.id === selectedIds[0]) ?? null;
    setEditingGuest(guest);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    const confirmDelete = window.confirm(
      `Borrar ${selectedIds.length} invitado(s)? Esta accion no se puede deshacer.`,
    );
    if (!confirmDelete) return;
    await guestService.delete(selectedIds);
    setGuests((prev) => prev.filter((guest) => !selectedIds.includes(guest.id)));
    setSelectedIds([]);
  };

  const handleStatusChange = async (status: GuestStatus) => {
    if (selectedIds.length === 0) return;
    const updated = await guestService.updateStatus(selectedIds, status);
    setGuests((prev) =>
      prev.map((guest) => updated.find((item) => item.id === guest.id) ?? guest),
    );
  };

  const handleSubmit = async (input: GuestCreateInput) => {
    if (editingGuest) {
      const updated = await guestService.update({
        id: editingGuest.id,
        ...input,
      });
      if (updated) {
        setGuests((prev) =>
          prev.map((guest) => (guest.id === updated.id ? updated : guest)),
        );
      }
    } else {
      const created = await guestService.create(input);
      setGuests((prev) => [created, ...prev]);
    }
    setModalOpen(false);
    setSelectedIds([]);
  };

  const handleCoupleSave = (nextCouple: Couple) => {
    setIsCoupleLoading(true);
    coupleService
      .upsert(nextCouple)
      .then((savedCouple) => {
        setCouple(savedCouple);
        setIsCoupleModalOpen(false);
      })
      .finally(() => setIsCoupleLoading(false));
  };

  const handleCoupleClose = () => {
    saveCoupleSetupSkipped();
    setIsCoupleModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-10 text-zinc-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold">Invitados</h1>
          <p className="max-w-2xl text-sm text-zinc-600">
            Administra invitados, filtra por lado y tipo, y usa acciones
            masivas para confirmar o declinar asistencia.
          </p>
          {couple && (
            <div className="text-sm font-semibold text-zinc-700">
              Novios: {couple.bride_name} & {couple.groom_name}
            </div>
          )}
        </header>

        <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <GuestFilters value={filters} onChange={setFilters} />
            <BulkActions
              selectedCount={selectedIds.length}
              onCreate={openCreate}
              onEdit={openEdit}
              onConfirm={() => handleStatusChange("CONFIRMED")}
              onDecline={() => handleStatusChange("DECLINED")}
              onDelete={handleDelete}
            />
          </div>
          <div className="text-xs text-zinc-500">
            {filteredGuests.length} invitados con los filtros actuales ·{" "}
            {selectedIds.length} seleccionados
          </div>
        </div>

        <GuestTable
          guests={filteredGuests}
          mainGuestNameById={mainGuestNameById}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onToggleAll={handleToggleAll}
        />
      </div>

      <div className="fixed bottom-6 right-6">
        <button
          type="button"
          onClick={() => setIsCoupleModalOpen(true)}
          disabled={isCoupleLoading}
          className="h-11 rounded-full bg-white px-5 text-sm font-semibold text-zinc-900 shadow-md ring-1 ring-zinc-200 transition hover:bg-zinc-50"
        >
          {isCoupleLoading ? "Cargando..." : "Editar novios"}
        </button>
      </div>

      <CoupleSetupModal
        open={isCoupleModalOpen}
        initialCouple={couple}
        onClose={handleCoupleClose}
        onSubmit={handleCoupleSave}
      />

      <GuestModal
        open={modalOpen}
        mode={editingGuest ? "edit" : "create"}
        initialGuest={editingGuest}
        mainGuests={mainGuests}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

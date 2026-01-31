"use client";

import { useEffect, useState } from "react";
import type {
  Guest,
  GuestCreateInput,
  AgeRange,
  GuestSide,
  GuestStatus,
  GuestType,
} from "@/lib/guests/types";

type GuestModalProps = {
  open: boolean;
  mode: "create" | "edit";
  initialGuest: Guest | null;
  onClose: () => void;
  onSubmit: (input: GuestCreateInput) => void;
};

const defaultForm: GuestCreateInput = {
  full_name: "",
  guest_type: "MAIN_GUEST",
  main_guest_id: null,
  side: "BRIDE",
  age_range: "ADULT",
  notes: "",
  status: "INVITED",
};

export default function GuestModal({
  open,
  mode,
  initialGuest,
  onClose,
  onSubmit,
}: GuestModalProps) {
  const [form, setForm] = useState<GuestCreateInput>(defaultForm);

  useEffect(() => {
    if (initialGuest) {
      const { full_name, guest_type, main_guest_id, side, age_range, notes, status } =
        initialGuest;
      setForm({
        full_name,
        guest_type,
        main_guest_id,
        side,
        age_range,
        notes: notes ?? "",
        status,
      });
      return;
    }
    setForm(defaultForm);
  }, [initialGuest, open]);

  if (!open) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized: GuestCreateInput = {
      ...form,
      notes: form.notes?.trim() ? form.notes.trim() : null,
    };
    onSubmit(normalized);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900">
            {mode === "create" ? "Crear invitado" : "Editar invitado"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-semibold text-zinc-500 hover:text-zinc-700"
          >
            Cerrar
          </button>
        </div>
        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm font-medium text-zinc-700">
            Nombre
            <input
              required
              value={form.full_name}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, full_name: event.target.value }))
              }
              className="h-11 rounded-lg border border-zinc-300 px-3 text-sm"
              placeholder="Nombre completo"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-zinc-700">
            Notas / relacion
            <input
              value={form.notes ?? ""}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, notes: event.target.value }))
              }
              className="h-11 rounded-lg border border-zinc-300 px-3 text-sm"
              placeholder="Prima, amigo, etc."
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-zinc-700">
              Lado
              <select
                value={form.side ?? "BRIDE"}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    side: event.target.value as GuestSide,
                  }))
                }
                className="h-11 rounded-lg border border-zinc-300 px-3 text-sm"
              >
                <option value="BRIDE">Novia</option>
                <option value="GROOM">Novio</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-zinc-700">
              Tipo
              <select
                value={form.guest_type}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    guest_type: event.target.value as GuestType,
                  }))
                }
                className="h-11 rounded-lg border border-zinc-300 px-3 text-sm"
              >
                <option value="MAIN_GUEST">Invitado principal</option>
                <option value="PLUS_ONE">Acompañante</option>
                <option value="BRIDE">Novia</option>
                <option value="GROOM">Novio</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-zinc-700">
              Rango de edad
              <select
                value={form.age_range}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    age_range: event.target.value as AgeRange,
                  }))
                }
                className="h-11 rounded-lg border border-zinc-300 px-3 text-sm"
              >
                <option value="ADULT">Adulto</option>
                <option value="CHILD">Niño</option>
                <option value="BABY">Bebé</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-zinc-700">
              Estado
              <select
                value={form.status}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    status: event.target.value as GuestStatus,
                  }))
                }
                className="h-11 rounded-lg border border-zinc-300 px-3 text-sm"
              >
                <option value="INVITED">Invitado</option>
                <option value="CONFIRMED">Confirmado</option>
                <option value="DECLINED">Declinado</option>
              </select>
            </label>
          </div>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="h-11 rounded-full border border-zinc-300 px-5 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="h-11 rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

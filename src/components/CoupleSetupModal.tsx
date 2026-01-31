"use client";

import { useEffect, useState } from "react";
import type { Couple } from "@/lib/couple/types";

type CoupleSetupModalProps = {
  open: boolean;
  initialCouple: Couple | null;
  onClose: () => void;
  onSubmit: (couple: Couple) => void;
};

const defaultForm: Couple = {
  bride_name: "",
  groom_name: "",
};

export default function CoupleSetupModal({
  open,
  initialCouple,
  onClose,
  onSubmit,
}: CoupleSetupModalProps) {
  const [form, setForm] = useState<Couple>(defaultForm);

  useEffect(() => {
    if (initialCouple) {
      setForm(initialCouple);
      return;
    }
    setForm(defaultForm);
  }, [initialCouple, open]);

  if (!open) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized: Couple = {
      bride_name: form.bride_name.trim(),
      groom_name: form.groom_name.trim(),
    };
    onSubmit(normalized);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900">
            Configurar novios
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
            Nombre de la novia
            <input
              required
              value={form.bride_name}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, bride_name: event.target.value }))
              }
              className="h-11 rounded-lg border border-zinc-300 px-3 text-sm"
              placeholder="Nombre completo"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-zinc-700">
            Nombre del novio
            <input
              required
              value={form.groom_name}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, groom_name: event.target.value }))
              }
              className="h-11 rounded-lg border border-zinc-300 px-3 text-sm"
              placeholder="Nombre completo"
            />
          </label>
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

"use client";

import { useEffect, useState } from "react";
import type { Couple } from "@/lib/couple/types";

type CoupleSetupModalProps = {
  open: boolean;
  initialCouple: Couple | null;
  onClose: () => void;
  onSubmit: (couple: Couple) => void;
};

export default function CoupleSetupModal({
  open,
  initialCouple,
  onClose,
  onSubmit,
}: CoupleSetupModalProps) {
  const [brideName, setBrideName] = useState("");
  const [groomName, setGroomName] = useState("");

  useEffect(() => {
    if (open) {
      setBrideName(initialCouple?.bride_name ?? "");
      setGroomName(initialCouple?.groom_name ?? "");
    }
  }, [open, initialCouple]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      bride_name: brideName.trim(),
      groom_name: groomName.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900">
            Datos de los novios
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
              value={brideName}
              onChange={(e) => setBrideName(e.target.value)}
              className="h-11 rounded-lg border border-zinc-300 px-3 text-sm"
              placeholder="Ej. María"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium text-zinc-700">
            Nombre del novio
            <input
              value={groomName}
              onChange={(e) => setGroomName(e.target.value)}
              className="h-11 rounded-lg border border-zinc-300 px-3 text-sm"
              placeholder="Ej. Juan"
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

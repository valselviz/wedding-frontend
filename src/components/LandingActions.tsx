"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { coupleService } from "@/lib/couple/service";
import type { Couple } from "@/lib/couple/types";

export default function LandingActions() {
  const [couple, setCouple] = useState<Couple | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    coupleService
      .get()
      .then(setCouple)
      .catch(() => setCouple(null))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-12 items-center rounded-full border border-zinc-200 px-5 text-sm font-semibold text-zinc-500">
        Cargando...
      </div>
    );
  }

  if (couple) {
    return (
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex h-12 items-center rounded-full border border-zinc-200 px-5 text-sm font-semibold text-zinc-700">
          {couple.bride_name} & {couple.groom_name}
        </div>
        <Link
          href="/guests"
          className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white transition hover:bg-zinc-800"
        >
          Ir a invitados
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Link
        href="/guests?setup=couple"
        className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white transition hover:bg-zinc-800"
      >
        Crear novios
      </Link>
      <Link
        href="/guests"
        className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-300 px-6 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400"
      >
        Ir a invitados
      </Link>
    </div>
  );
}

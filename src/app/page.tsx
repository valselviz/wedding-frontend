import LandingActions from "@/components/LandingActions";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-16 text-zinc-900">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-12">
        <header className="flex flex-col gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Wedding Planner
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Bienvenidos a la organización del gran día
          </h1>
          <p className="max-w-2xl text-lg text-zinc-600">
            Empieza definiendo a los novios y luego gestiona a tus invitados con
            filtros, estados y acciones masivas.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold">Primera vez aquí</h2>
            <p className="mt-2 text-zinc-600">
              Registra a los novios para comenzar el flujo. Luego podrás crear
              invitados, confirmar asistencia y armar el presupuesto.
            </p>
            <div className="mt-6">
              <LandingActions />
            </div>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
            <h3 className="text-lg font-semibold">Qué puedes hacer</h3>
            <ul className="mt-4 space-y-3 text-sm text-zinc-600">
              <li>Filtrar invitados por lado, tipo y estado.</li>
              <li>Ordenar por familia o relación.</li>
              <li>Editar estados en bloque para confirmar o declinar.</li>
              <li>Ver rango de edad para estimar presupuesto.</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

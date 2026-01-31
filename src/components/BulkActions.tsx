"use client";

type BulkActionsProps = {
  selectedCount: number;
  onCreate: () => void;
  onEdit: () => void;
  onConfirm: () => void;
  onDecline: () => void;
  onDelete: () => void;
};

export default function BulkActions({
  selectedCount,
  onCreate,
  onEdit,
  onConfirm,
  onDecline,
  onDelete,
}: BulkActionsProps) {
  const hasSelection = selectedCount > 0;
  const singleSelection = selectedCount === 1;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onCreate}
        className="h-10 rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800"
      >
        Crear invitado
      </button>
      <button
        type="button"
        onClick={onEdit}
        disabled={!singleSelection}
        className="h-10 rounded-full border border-zinc-300 px-4 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Editar
      </button>
      <button
        type="button"
        onClick={onConfirm}
        disabled={!hasSelection}
        className="h-10 rounded-full border border-zinc-300 px-4 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Confirmar
      </button>
      <button
        type="button"
        onClick={onDecline}
        disabled={!hasSelection}
        className="h-10 rounded-full border border-zinc-300 px-4 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Declinar
      </button>
      <button
        type="button"
        onClick={onDelete}
        disabled={!hasSelection}
        className="h-10 rounded-full border border-red-200 px-4 text-sm font-semibold text-red-600 transition hover:border-red-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Borrar
      </button>
    </div>
  );
}

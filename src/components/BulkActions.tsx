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

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onCreate}
        className="h-10 rounded-lg bg-zinc-900 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800"
      >
        Nuevo invitado
      </button>
      {hasSelection && (
        <>
          <button
            type="button"
            onClick={onEdit}
            disabled={selectedCount !== 1}
            title={selectedCount !== 1 ? "Selecciona solo uno para editar" : undefined}
            className="h-10 rounded-lg border border-zinc-300 px-4 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 disabled:opacity-50"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-10 rounded-lg border border-emerald-600 px-4 text-sm font-semibold text-emerald-600 transition hover:bg-emerald-50"
          >
            Confirmar
          </button>
          <button
            type="button"
            onClick={onDecline}
            className="h-10 rounded-lg border border-amber-600 px-4 text-sm font-semibold text-amber-600 transition hover:bg-amber-50"
          >
            Declinar
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="h-10 rounded-lg border border-red-600 px-4 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            Borrar
          </button>
        </>
      )}
    </div>
  );
}

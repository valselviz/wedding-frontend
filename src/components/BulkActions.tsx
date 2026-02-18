"use client";

type BulkActionsProps = {
  selectedCount: number;
  onCreate: () => void;
  onConfirm: () => void;
  onDecline: () => void;
  onDelete: () => void;
  onAddToGroup: () => void;
};

export default function BulkActions({
  selectedCount,
  onCreate,
  onConfirm,
  onDecline,
  onDelete,
  onAddToGroup,
}: BulkActionsProps) {
  const hasSelection = selectedCount > 0;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onCreate}
        className="h-10 rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800"
      >
        Crear invitado
      </button>
      {hasSelection && (
        <>
          <button
            type="button"
            onClick={onAddToGroup}
            className="h-10 rounded-full border border-zinc-300 px-4 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400"
          >
            Agregar a grupo
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-10 rounded-full border border-zinc-300 px-4 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400"
          >
            Confirmar
          </button>
          <button
            type="button"
            onClick={onDecline}
            className="h-10 rounded-full border border-zinc-300 px-4 text-sm font-semibold text-zinc-900 transition hover:border-zinc-400"
          >
            Declinar
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="h-10 rounded-full border border-red-200 px-4 text-sm font-semibold text-red-600 transition hover:border-red-300"
          >
            Borrar
          </button>
        </>
      )}
    </div>
  );
}

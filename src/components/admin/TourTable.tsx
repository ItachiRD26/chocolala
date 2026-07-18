"use client";

import type { Tour } from "@/types";

type TourTableProps = {
  tours: Tour[];
  onEdit: (tour: Tour) => void;
  onDelete: (tour: Tour) => void;
};

export default function TourTable({ tours, onEdit, onDelete }: TourTableProps) {
  if (tours.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
        <p className="font-sans text-sm text-slate-500">
          Aún no hay tours. Crea el primero.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <table className="w-full text-left font-sans text-sm">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-800/60">
            <th className="px-5 py-3.5 font-semibold uppercase tracking-wide text-xs text-slate-400">Nombre</th>
            <th className="px-5 py-3.5 font-semibold uppercase tracking-wide text-xs text-slate-400">Duración</th>
            <th className="px-5 py-3.5 font-semibold uppercase tracking-wide text-xs text-slate-400">Estado</th>
            <th className="px-5 py-3.5" />
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr
              key={tour.id}
              className="border-t border-slate-800 transition-colors hover:bg-slate-800/30"
            >
              <td className="px-5 py-3.5 font-medium text-white">
                {tour.name.es}
              </td>
              <td className="px-5 py-3.5 text-slate-400">
                {tour.duration}
                {tour.ageRange ? (
                  <span className="ml-2 rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-500">
                    {tour.ageRange}
                  </span>
                ) : null}
              </td>
              <td className="px-5 py-3.5">
                {tour.active ? (
                  <span className="rounded-full bg-emerald-950 px-2.5 py-0.5 font-sans text-xs font-semibold text-emerald-400">
                    Activo
                  </span>
                ) : (
                  <span className="rounded-full bg-slate-800 px-2.5 py-0.5 font-sans text-xs font-semibold text-slate-500">
                    Inactivo
                  </span>
                )}
              </td>
              <td className="px-5 py-3.5 text-right">
                <button
                  type="button"
                  onClick={() => onEdit(tour)}
                  className="mr-4 font-sans text-sm font-semibold text-sky-400 transition-colors hover:text-sky-300"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(tour)}
                  className="font-sans text-sm font-semibold text-red-400 transition-colors hover:text-red-300"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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
      <p className="rounded-2xl bg-white p-6 font-sans text-sm text-chocolala-brown/60">
        Aún no hay tours. Crea el primero.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white">
      <table className="w-full text-left font-sans text-sm">
        <thead className="bg-chocolala-brown/5 text-chocolala-brown/70">
          <tr>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Duración</th>
            <th className="px-4 py-3">Activo</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {tours.map((tour) => (
            <tr key={tour.id} className="border-t border-chocolala-brown/10">
              <td className="px-4 py-3 text-chocolala-brown">
                {tour.name.es}
              </td>
              <td className="px-4 py-3 text-chocolala-brown/70">
                {tour.duration}
                {tour.ageRange ? ` · ${tour.ageRange}` : ""}
              </td>
              <td className="px-4 py-3">{tour.active ? "Sí" : "No"}</td>
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => onEdit(tour)}
                  className="mr-3 font-semibold text-chocolala-green hover:underline"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(tour)}
                  className="font-semibold text-red-600 hover:underline"
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

"use client";

import { useState } from "react";
import { useTours } from "@/hooks/useTours";
import { deleteTour } from "@/lib/firebase/firestore";
import TourForm from "@/components/admin/TourForm";
import TourTable from "@/components/admin/TourTable";
import type { Tour } from "@/types";

export default function AdminToursPage() {
  const { tours, loading, refetch } = useTours(false);
  const [editing, setEditing] = useState<Tour | null>(null);
  const [creating, setCreating] = useState(false);

  function closeForm() {
    setEditing(null);
    setCreating(false);
  }

  async function handleSaved() {
    closeForm();
    await refetch();
  }

  async function handleDelete(tour: Tour) {
    if (!confirm(`¿Eliminar "${tour.name.es}"?`)) return;
    await deleteTour(tour.id);
    await refetch();
  }

  const showForm = creating || editing !== null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-3xl text-chocolala-brown">Tours</h1>
        {!showForm && (
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="rounded-full bg-chocolala-orange px-5 py-2 font-sans text-sm font-semibold text-white"
          >
            + Nuevo tour
          </button>
        )}
      </div>

      {showForm ? (
        <TourForm tour={editing} onSaved={handleSaved} onCancel={closeForm} />
      ) : loading ? (
        <p className="font-sans text-sm text-chocolala-brown/60">
          Cargando...
        </p>
      ) : (
        <TourTable tours={tours} onEdit={setEditing} onDelete={handleDelete} />
      )}
    </div>
  );
}

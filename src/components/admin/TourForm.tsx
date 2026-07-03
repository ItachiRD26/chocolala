"use client";

import { useState, type FormEvent } from "react";
import { saveTour } from "@/lib/firebase/firestore";
import { uploadTourImage } from "@/lib/firebase/storage";
import ImageUploader from "@/components/admin/ImageUploader";
import type { Tour } from "@/types";

type TourFormProps = {
  tour?: Tour | null;
  onSaved: () => void;
  onCancel: () => void;
};

function emptyTour(): Omit<Tour, "id"> & { id: string } {
  return {
    id: crypto.randomUUID(),
    name: { es: "", en: "" },
    description: { es: "", en: "" },
    duration: "",
    ageRange: "",
    images: [],
    price: { es: "", en: "" },
    active: true,
    order: 0,
  };
}

export default function TourForm({ tour, onSaved, onCancel }: TourFormProps) {
  const [form, setForm] = useState(() => tour ?? emptyTour());
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await saveTour(form);
      onSaved();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl bg-white p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block font-sans text-sm font-medium text-chocolala-brown">
            Nombre (ES)
          </label>
          <input
            required
            value={form.name.es}
            onChange={(e) =>
              setForm({ ...form, name: { ...form.name, es: e.target.value } })
            }
            className="w-full rounded-lg border border-chocolala-brown/20 px-3 py-2 font-sans text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block font-sans text-sm font-medium text-chocolala-brown">
            Nombre (EN)
          </label>
          <input
            required
            value={form.name.en}
            onChange={(e) =>
              setForm({ ...form, name: { ...form.name, en: e.target.value } })
            }
            className="w-full rounded-lg border border-chocolala-brown/20 px-3 py-2 font-sans text-sm"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block font-sans text-sm font-medium text-chocolala-brown">
            Descripción (ES)
          </label>
          <textarea
            required
            rows={3}
            value={form.description.es}
            onChange={(e) =>
              setForm({
                ...form,
                description: { ...form.description, es: e.target.value },
              })
            }
            className="w-full rounded-lg border border-chocolala-brown/20 px-3 py-2 font-sans text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block font-sans text-sm font-medium text-chocolala-brown">
            Descripción (EN)
          </label>
          <textarea
            required
            rows={3}
            value={form.description.en}
            onChange={(e) =>
              setForm({
                ...form,
                description: { ...form.description, en: e.target.value },
              })
            }
            className="w-full rounded-lg border border-chocolala-brown/20 px-3 py-2 font-sans text-sm"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block font-sans text-sm font-medium text-chocolala-brown">
            Duración
          </label>
          <input
            required
            placeholder="3 horas"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className="w-full rounded-lg border border-chocolala-brown/20 px-3 py-2 font-sans text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block font-sans text-sm font-medium text-chocolala-brown">
            Rango de edad (opcional)
          </label>
          <input
            placeholder="5-12 años"
            value={form.ageRange ?? ""}
            onChange={(e) => setForm({ ...form, ageRange: e.target.value })}
            className="w-full rounded-lg border border-chocolala-brown/20 px-3 py-2 font-sans text-sm"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block font-sans text-sm font-medium text-chocolala-brown">
            Precio en pesos (ES) — ej. RD$500 p/p
          </label>
          <input
            value={form.price?.es ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                price: { es: e.target.value, en: form.price?.en ?? "" },
              })
            }
            className="w-full rounded-lg border border-chocolala-brown/20 px-3 py-2 font-sans text-sm"
          />
        </div>
        <div>
          <label className="mb-1 block font-sans text-sm font-medium text-chocolala-brown">
            Precio en dólares (EN) — ej. $5 USD p/p
          </label>
          <input
            value={form.price?.en ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                price: { es: form.price?.es ?? "", en: e.target.value },
              })
            }
            className="w-full rounded-lg border border-chocolala-brown/20 px-3 py-2 font-sans text-sm"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex items-center gap-2 font-sans text-sm text-chocolala-brown">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
          />
          Activo
        </label>
        <div>
          <label className="mb-1 block font-sans text-sm font-medium text-chocolala-brown">
            Orden
          </label>
          <input
            type="number"
            value={form.order}
            onChange={(e) =>
              setForm({ ...form, order: Number(e.target.value) })
            }
            className="w-full rounded-lg border border-chocolala-brown/20 px-3 py-2 font-sans text-sm"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block font-sans text-sm font-medium text-chocolala-brown">
          Imágenes
        </label>
        <ImageUploader
          upload={(file) => uploadTourImage(file, form.id)}
          images={form.images}
          onChange={(images) => setForm({ ...form, images })}
        />
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full px-5 py-2 font-sans text-sm text-chocolala-brown/70 hover:bg-chocolala-brown/5"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-chocolala-brown px-5 py-2 font-sans text-sm font-semibold text-white disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
}

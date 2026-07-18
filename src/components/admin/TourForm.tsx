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

const inputCls = "w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-sans text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-chocolala-orange";
const labelCls = "mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wide text-slate-400";

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
      className="flex flex-col gap-5 rounded-2xl border border-slate-800 bg-slate-900 p-6"
    >
      <h2 className="font-serif text-xl text-white">
        {tour ? "Editar tour" : "Nuevo tour"}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Nombre (ES)</label>
          <input
            required
            value={form.name.es}
            onChange={(e) => setForm({ ...form, name: { ...form.name, es: e.target.value } })}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Nombre (EN)</label>
          <input
            required
            value={form.name.en}
            onChange={(e) => setForm({ ...form, name: { ...form.name, en: e.target.value } })}
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Descripción (ES)</label>
          <textarea
            required
            rows={3}
            value={form.description.es}
            onChange={(e) => setForm({ ...form, description: { ...form.description, es: e.target.value } })}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Descripción (EN)</label>
          <textarea
            required
            rows={3}
            value={form.description.en}
            onChange={(e) => setForm({ ...form, description: { ...form.description, en: e.target.value } })}
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Duración</label>
          <input
            required
            placeholder="3 horas"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Rango de edad (opcional)</label>
          <input
            placeholder="5-12 años"
            value={form.ageRange ?? ""}
            onChange={(e) => setForm({ ...form, ageRange: e.target.value })}
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Precio en pesos (ES)</label>
          <input
            value={form.price?.es ?? ""}
            placeholder="RD$2,000 p/p"
            onChange={(e) => setForm({ ...form, price: { es: e.target.value, en: form.price?.en ?? "" } })}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Precio en dólares (EN)</label>
          <input
            value={form.price?.en ?? ""}
            placeholder="$33 USD p/p"
            onChange={(e) => setForm({ ...form, price: { es: form.price?.es ?? "", en: e.target.value } })}
            className={inputCls}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex cursor-pointer items-center gap-2.5 font-sans text-sm text-slate-300">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
            className="h-4 w-4 accent-chocolala-orange"
          />
          Activo (visible en el sitio)
        </label>
        <div>
          <label className={labelCls}>Orden</label>
          <input
            type="number"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label className={labelCls}>Imágenes</label>
        <ImageUploader
          upload={(file) => uploadTourImage(file, form.id)}
          images={form.images}
          onChange={(images) => setForm({ ...form, images })}
        />
      </div>

      <div className="flex justify-end gap-3 border-t border-slate-800 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-slate-700 px-5 py-2 font-sans text-sm text-slate-400 transition-colors hover:border-slate-500 hover:text-slate-200"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-chocolala-orange px-5 py-2 font-sans text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Guardar tour"}
        </button>
      </div>
    </form>
  );
}

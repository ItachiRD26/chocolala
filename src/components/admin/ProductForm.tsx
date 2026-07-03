"use client";

import { useState, type FormEvent } from "react";
import { saveProduct } from "@/lib/firebase/firestore";
import { uploadProductImage } from "@/lib/firebase/storage";
import ImageUploader from "@/components/admin/ImageUploader";
import type { Product } from "@/types";

type ProductFormProps = {
  product?: Product | null;
  onSaved: () => void;
  onCancel: () => void;
};

function emptyProduct(): Omit<Product, "id"> & { id: string } {
  return {
    id: crypto.randomUUID(),
    name: { es: "", en: "" },
    description: { es: "", en: "" },
    category: "",
    images: [],
    price: { es: "", en: "" },
    featured: false,
    active: true,
    order: 0,
    createdAt: Date.now(),
  };
}

export default function ProductForm({
  product,
  onSaved,
  onCancel,
}: ProductFormProps) {
  const [form, setForm] = useState(() => product ?? emptyProduct());
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await saveProduct(form);
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
            Categoría (slug)
          </label>
          <input
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full rounded-lg border border-chocolala-brown/20 px-3 py-2 font-sans text-sm"
          />
        </div>
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

      <div className="flex gap-6 font-sans text-sm text-chocolala-brown">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) =>
              setForm({ ...form, featured: e.target.checked })
            }
          />
          Destacado
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
          />
          Activo
        </label>
      </div>

      <div>
        <label className="mb-1 block font-sans text-sm font-medium text-chocolala-brown">
          Imágenes
        </label>
        <ImageUploader
          upload={(file) => uploadProductImage(file, form.id)}
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

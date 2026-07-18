"use client";

import type { Product } from "@/types";

type ProductTableProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
        <p className="font-sans text-sm text-slate-500">
          Aún no hay productos. Crea el primero.
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
            <th className="px-5 py-3.5 font-semibold uppercase tracking-wide text-xs text-slate-400">Categoría</th>
            <th className="px-5 py-3.5 font-semibold uppercase tracking-wide text-xs text-slate-400">Destacado</th>
            <th className="px-5 py-3.5 font-semibold uppercase tracking-wide text-xs text-slate-400">Estado</th>
            <th className="px-5 py-3.5" />
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-t border-slate-800 transition-colors hover:bg-slate-800/30"
            >
              <td className="px-5 py-3.5 font-medium text-white">
                {product.name.es}
              </td>
              <td className="px-5 py-3.5 text-slate-400">
                {product.category || "—"}
              </td>
              <td className="px-5 py-3.5">
                {product.featured ? (
                  <span className="rounded-full bg-chocolala-orange/15 px-2.5 py-0.5 font-sans text-xs font-semibold text-chocolala-orange">
                    Sí
                  </span>
                ) : (
                  <span className="text-slate-600">No</span>
                )}
              </td>
              <td className="px-5 py-3.5">
                {product.active ? (
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
                  onClick={() => onEdit(product)}
                  className="mr-4 font-sans text-sm font-semibold text-sky-400 transition-colors hover:text-sky-300"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(product)}
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

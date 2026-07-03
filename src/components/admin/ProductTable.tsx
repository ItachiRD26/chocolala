"use client";

import type { Product } from "@/types";

type ProductTableProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
};

export default function ProductTable({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) {
  if (products.length === 0) {
    return (
      <p className="rounded-2xl bg-white p-6 font-sans text-sm text-chocolala-brown/60">
        Aún no hay productos. Crea el primero.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white">
      <table className="w-full text-left font-sans text-sm">
        <thead className="bg-chocolala-brown/5 text-chocolala-brown/70">
          <tr>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Categoría</th>
            <th className="px-4 py-3">Destacado</th>
            <th className="px-4 py-3">Activo</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t border-chocolala-brown/10">
              <td className="px-4 py-3 text-chocolala-brown">
                {product.name.es}
              </td>
              <td className="px-4 py-3 text-chocolala-brown/70">
                {product.category || "—"}
              </td>
              <td className="px-4 py-3">{product.featured ? "Sí" : "No"}</td>
              <td className="px-4 py-3">{product.active ? "Sí" : "No"}</td>
              <td className="px-4 py-3 text-right">
                <button
                  type="button"
                  onClick={() => onEdit(product)}
                  className="mr-3 font-semibold text-chocolala-green hover:underline"
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(product)}
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

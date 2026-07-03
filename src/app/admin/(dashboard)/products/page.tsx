"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { deleteProduct } from "@/lib/firebase/firestore";
import ProductForm from "@/components/admin/ProductForm";
import ProductTable from "@/components/admin/ProductTable";
import type { Product } from "@/types";

export default function AdminProductsPage() {
  const { products, loading, refetch } = useProducts(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);

  function closeForm() {
    setEditing(null);
    setCreating(false);
  }

  async function handleSaved() {
    closeForm();
    await refetch();
  }

  async function handleDelete(product: Product) {
    if (!confirm(`¿Eliminar "${product.name.es}"?`)) return;
    await deleteProduct(product.id);
    await refetch();
  }

  const showForm = creating || editing !== null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-3xl text-chocolala-brown">
          Productos
        </h1>
        {!showForm && (
          <button
            type="button"
            onClick={() => setCreating(true)}
            className="rounded-full bg-chocolala-orange px-5 py-2 font-sans text-sm font-semibold text-white"
          >
            + Nuevo producto
          </button>
        )}
      </div>

      {showForm ? (
        <ProductForm
          product={editing}
          onSaved={handleSaved}
          onCancel={closeForm}
        />
      ) : loading ? (
        <p className="font-sans text-sm text-chocolala-brown/60">
          Cargando...
        </p>
      ) : (
        <ProductTable
          products={products}
          onEdit={setEditing}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

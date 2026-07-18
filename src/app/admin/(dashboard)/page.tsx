"use client";

import { useProducts } from "@/hooks/useProducts";
import { useTours } from "@/hooks/useTours";

export default function AdminDashboardPage() {
  const { products, loading: loadingProducts } = useProducts(false);
  const { tours, loading: loadingTours } = useTours(false);

  const activeProducts = products.filter((p) => p.active).length;
  const activeTours = tours.filter((t) => t.active).length;

  const stats = [
    { label: "Productos activos", value: loadingProducts ? null : activeProducts, accent: true },
    { label: "Productos totales", value: loadingProducts ? null : products.length, accent: false },
    { label: "Tours activos", value: loadingTours ? null : activeTours, accent: true },
    { label: "Tours totales", value: loadingTours ? null : tours.length, accent: false },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-white">Dashboard</h1>
        <p className="mt-1 font-sans text-sm text-slate-500">
          Resumen del catálogo Chocolala.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
          >
            <p className={`font-serif text-4xl ${stat.accent ? "text-chocolala-orange" : "text-white"}`}>
              {stat.value === null ? (
                <span className="inline-block h-8 w-8 animate-pulse rounded-lg bg-slate-800" />
              ) : (
                stat.value
              )}
            </p>
            <p className="mt-2 font-sans text-xs text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <p className="font-sans text-sm font-semibold text-slate-400">Accesos rápidos</p>
        <div className="mt-4 flex gap-3">
          <a
            href="/admin/products"
            className="rounded-full bg-chocolala-orange/10 px-4 py-2 font-sans text-sm font-semibold text-chocolala-orange transition-colors hover:bg-chocolala-orange/20"
          >
            + Nuevo producto
          </a>
          <a
            href="/admin/tours"
            className="rounded-full border border-slate-700 px-4 py-2 font-sans text-sm font-semibold text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
          >
            + Nuevo tour
          </a>
        </div>
      </div>
    </div>
  );
}

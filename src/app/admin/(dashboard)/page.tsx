"use client";

import { useProducts } from "@/hooks/useProducts";
import { useTours } from "@/hooks/useTours";

export default function AdminDashboardPage() {
  const { products, loading: loadingProducts } = useProducts(false);
  const { tours, loading: loadingTours } = useTours(false);

  const activeProducts = products.filter((p) => p.active).length;
  const activeTours = tours.filter((t) => t.active).length;

  const stats = [
    {
      label: "Productos activos",
      value: loadingProducts ? "—" : activeProducts,
    },
    { label: "Productos totales", value: loadingProducts ? "—" : products.length },
    { label: "Tours activos", value: loadingTours ? "—" : activeTours },
    { label: "Tours totales", value: loadingTours ? "—" : tours.length },
  ];

  return (
    <div>
      <h1 className="mb-6 font-serif text-3xl text-chocolala-brown">
        Dashboard
      </h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-white p-6 text-center"
          >
            <p className="font-serif text-3xl text-chocolala-brown">
              {stat.value}
            </p>
            <p className="mt-1 font-sans text-xs text-chocolala-brown/60">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

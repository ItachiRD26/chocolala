"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Productos" },
  { href: "/admin/tours", label: "Tours" },
] as const;

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="flex h-full w-56 flex-col justify-between bg-chocolala-brown p-6 text-chocolala-cream">
      <div className="flex flex-col gap-1">
        <span className="mb-6 font-serif text-xl">Chocolala Admin</span>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-lg px-3 py-2 font-sans text-sm transition-colors ${
              pathname === link.href
                ? "bg-chocolala-cream/10 font-semibold"
                : "text-chocolala-cream/80 hover:bg-chocolala-cream/5"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <button
        type="button"
        onClick={() => logout()}
        className="rounded-lg px-3 py-2 text-left font-sans text-sm text-chocolala-cream/70 transition-colors hover:bg-chocolala-cream/5"
      >
        Cerrar sesión
      </button>
    </aside>
  );
}

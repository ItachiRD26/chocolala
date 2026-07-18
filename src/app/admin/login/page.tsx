"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLoginPage() {
  const { login, user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/admin");
    }
  }, [loading, user, router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      router.replace("/admin");
    } catch {
      setError("Correo o contraseña incorrectos.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <span className="font-serif text-3xl text-white">Chocolala</span>
          <p className="mt-1 font-sans text-xs font-semibold uppercase tracking-widest text-chocolala-orange">
            Panel de Administración
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl"
        >
          <h1 className="mb-1 font-sans text-lg font-semibold text-white">
            Iniciar sesión
          </h1>
          <p className="mb-6 font-sans text-sm text-slate-500">
            Acceso restringido al equipo Chocolala.
          </p>

          <div className="mb-4">
            <label className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wide text-slate-400">
              Correo
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@chocolala.do"
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-sans text-sm text-white placeholder:text-slate-600 outline-none transition-colors focus:border-chocolala-orange"
            />
          </div>

          <div className="mb-5">
            <label className="mb-1.5 block font-sans text-xs font-semibold uppercase tracking-wide text-slate-400">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-sans text-sm text-white outline-none transition-colors focus:border-chocolala-orange"
            />
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-900/50 bg-red-950/40 px-3 py-2.5">
              <p className="font-sans text-sm text-red-400">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-chocolala-orange px-4 py-2.5 font-sans text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {submitting ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}

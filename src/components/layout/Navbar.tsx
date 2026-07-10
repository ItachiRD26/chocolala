"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import Logo from "@/components/ui/Logo";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function Navbar() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Native touchstart listener — bypasses React's event delegation and any
  // dev-mode overlays that intercept synthetic events on real mobile devices.
  // e.preventDefault() stops the ghost click from also firing.
  useEffect(() => {
    const btn = menuBtnRef.current;
    if (!btn) return;
    const onTouch = (e: TouchEvent) => {
      e.preventDefault();
      setMenuOpen((prev) => !prev);
    };
    btn.addEventListener("touchstart", onTouch, { passive: false });
    return () => btn.removeEventListener("touchstart", onTouch);
  }, []);

  const links = [
    { href: "/", label: t("home") },
    { href: "/products", label: t("products") },
    { href: "/tours", label: t("tours") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ] as const;

  const close = () => setMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "bg-chocolala-brown-dark/95 shadow-sm"
          : "bg-chocolala-brown-dark/5"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Chocolala" onClick={close}>
          <Logo variant="white" className="h-16 w-auto sm:h-20" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 font-sans text-sm font-medium text-chocolala-cream md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition-colors hover:text-chocolala-orange">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>

        {/* Hamburger — native touchstart (real mobile) + onClick (desktop/keyboard) */}
        <button
          ref={menuBtnRef}
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
          className="touch-manipulation flex h-12 w-12 flex-col items-center justify-center gap-1.5 md:hidden"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
            userSelect: "none",
            WebkitUserSelect: "none",
          }}
        >
          <span
            className="block h-0.5 w-6 rounded-full bg-chocolala-cream transition-transform duration-200"
            style={{ transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }}
          />
          <span
            className="block h-0.5 w-6 rounded-full bg-chocolala-cream transition-opacity duration-200"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block h-0.5 w-6 rounded-full bg-chocolala-cream transition-transform duration-200"
            style={{ transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }}
          />
        </button>
      </nav>

      {/* Mobile menu — block/none via inline style (no max-height animation that breaks on v4) */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="bg-chocolala-brown-dark/98 md:hidden"
        >
          <ul className="flex flex-col gap-1 px-6 pb-6 pt-2 font-sans font-medium text-chocolala-cream">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={close}
                  className="block py-3 text-base transition-colors hover:text-chocolala-orange"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="border-t border-chocolala-cream/10 pt-3">
              <LanguageSwitcher />
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

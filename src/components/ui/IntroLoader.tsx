"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import Logo from "@/components/ui/Logo";

// Module-level flag: survives re-renders and client-side navigations
// (layout remounts), but resets on full page reload — correct behavior.
let loaderShown = false;

/*
  El problema de los timers: en React 18 Strict Mode (desarrollo), useEffect
  se ejecuta dos veces (mount → cleanup → mount). El cleanup clearTimeout()
  cancela los timers del primer mount, y si algo causa un remount, el ciclo
  se repite indefinidamente.

  Solución: usar CSS animation con animation-delay para manejar el timing.
  Las animaciones CSS son inmunes al ciclo de vida de React — el browser
  las corre en su propia thread. onAnimationEnd dispara el dismiss final.
*/

const SHOW_MS = 2800; // ms visibles antes de empezar a desvanecerse
const FADE_MS = 750;  // duración del fade-out

const COPY = {
  es: {
    slogan: "Poca espuma, mucho chocolate.",
    sub: "Cacao artesanal · República Dominicana",
  },
  en: {
    slogan: "Less foam, more chocolate.",
    sub: "Artisan cacao · Dominican Republic",
  },
} as const;

export default function IntroLoader() {
  const locale = useLocale() as "es" | "en";
  const copy = COPY[locale] ?? COPY.es;
  // Start already-gone if loader was shown before in this session
  const [gone, setGone] = useState(loaderShown);

  // Lock scroll only on first show — guard prevents re-locking on remounts
  // (without guard: layout remounts set overflow:hidden but onAnimationEnd
  //  never fires → overflow stays hidden → Android Chrome swallows tap events)
  useEffect(() => {
    if (loaderShown) return;

    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    // Fallback: force-dismiss if onAnimationEnd never fires on device
    const fallback = setTimeout(() => {
      if (loaderShown) return;
      loaderShown = true;
      document.documentElement.style.overflow = "";
      document.documentElement.style.overscrollBehavior = "";
      document.body.style.overflow = "";
      document.body.style.overscrollBehavior = "";
      setGone(true);
    }, SHOW_MS + FADE_MS + 500);

    return () => {
      clearTimeout(fallback);
      document.documentElement.style.overflow = "";
      document.documentElement.style.overscrollBehavior = "";
      document.body.style.overflow = "";
      document.body.style.overscrollBehavior = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#170804",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Never intercept pointer events — loader is visual-only.
        // CSS `pointer-events` is not animatable, so `pointer-events:none`
        // inside @keyframes is unreliable. Static style is the safe approach.
        pointerEvents: "none",
        animation: `loader-exit ${FADE_MS}ms ease ${SHOW_MS}ms forwards`,
      }}
      onAnimationEnd={(e) => {
        if (e.animationName !== "loader-exit") return;
        loaderShown = true;
        document.documentElement.style.overflow = "";
        document.documentElement.style.overscrollBehavior = "";
        document.body.style.overflow = "";
        document.body.style.overscrollBehavior = "";
        setGone(true);
      }}
    >
      {/* Video — poster shows first frame instantly while video loads */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/videos/loader-poster.webp"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src="/videos/loader.webm" type="video/webm" />
      </video>

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(23,8,4,0.68)",
        }}
      />

      {/* Radial vignette */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 35%, rgba(23,8,4,0.65) 100%)",
        }}
      />

      {/* Content — explicit z-index, fully visible from frame 1 */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          padding: "0 24px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            filter:
              "drop-shadow(0 0 48px rgba(242,115,76,0.28)) drop-shadow(0 2px 16px rgba(0,0,0,0.6))",
          }}
        >
          <Logo variant="white" className="h-36 w-auto sm:h-48 md:h-56" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <p
            style={{
              fontFamily: "Georgia, Constantia, serif",
              fontSize: "clamp(0.95rem, 3vw, 1.2rem)",
              fontStyle: "italic",
              color: "rgba(253,246,239,0.82)",
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            {copy.slogan}
          </p>
          <p
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
              fontSize: "0.65rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.32em",
              color: "rgba(242,115,76,0.82)",
              margin: 0,
            }}
          >
            {copy.sub}
          </p>
        </div>

        {/* Loading dots */}
        <div style={{ display: "flex", gap: "6px" }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "rgba(253,246,239,0.55)",
                animation: `choc-blink 1.4s ${i * 0.22}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes loader-exit {
          to { opacity: 0; }
        }
        @keyframes choc-blink {
          0%, 75%, 100% { opacity: 0.18; transform: scale(0.75); }
          37%           { opacity: 1;    transform: scale(1.2);  }
        }
      `}</style>
    </div>
  );
}

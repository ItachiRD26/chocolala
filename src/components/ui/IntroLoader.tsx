"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";

const WAVE_PATH =
  "M0,20 Q25,5 50,20 T100,20 T150,20 T200,20 T250,20 T300,20 T350,20 T400,20 V60 H0 Z";

const TOTAL_HOLD_MS = 2100;

type WaveLayerProps = {
  fill: string;
  opacityClass: string;
  duration: number;
  heightClass: string;
  bobDuration: number;
};

function WaveLayer({ fill, opacityClass, duration, heightClass, bobDuration }: WaveLayerProps) {
  return (
    <motion.div
      className={`absolute bottom-0 left-0 w-full ${heightClass}`}
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: bobDuration, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.svg
        aria-hidden="true"
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
        className={`h-full w-[200%] ${opacityClass}`}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        <path d={WAVE_PATH} fill={fill} />
      </motion.svg>
    </motion.div>
  );
}

export default function IntroLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, TOTAL_HOLD_MS);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-100 overflow-hidden bg-chocolala-brown"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-chocolala-orange/10 blur-3xl"
          />

          <div className="absolute inset-x-0 bottom-0 h-3/4">
            <WaveLayer
              fill="#7a3e1d"
              opacityClass="opacity-40"
              duration={8}
              bobDuration={4.5}
              heightClass="h-full"
            />
            <WaveLayer
              fill="#5c2c12"
              opacityClass="opacity-75"
              duration={5.5}
              bobDuration={3.6}
              heightClass="h-[80%]"
            />
            <WaveLayer
              fill="#2e160b"
              opacityClass="opacity-100"
              duration={3.6}
              bobDuration={2.8}
              heightClass="h-[58%]"
            />
          </div>

          <div className="relative z-10 flex h-full items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            >
              <Logo
                variant="white"
                className="h-48 drop-shadow-[0_4px_14px_rgba(0,0,0,0.4)] sm:h-72"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

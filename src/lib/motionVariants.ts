import type { Variants } from "framer-motion";

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export const staggerItem: Variants = {
  hidden: { y: 20 },
  show: { y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

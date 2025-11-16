'use client';

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { MoonStarIcon, SunIcon } from "lucide-react";

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const themeValue = resolvedTheme ?? theme;
  const isClient = typeof window !== "undefined";

  if (!isClient || !themeValue) {
    return (
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/70 ring-1 ring-white/20 backdrop-blur">
        <span className="sr-only">Thème</span>
      </span>
    );
  }

  const isDark = themeValue === "dark";

  return (
    <motion.button
      type="button"
      aria-label="Basculer le thème"
      whileTap={{ scale: 0.94 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-white/10 via-white/5 to-white/0 text-white transition shadow-lg shadow-indigo-900/20 ring-1 ring-white/30 backdrop-blur"
    >
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="text-white"
      >
        {isDark ? <MoonStarIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
      </motion.span>
      <span className="sr-only">Changer le thème</span>
    </motion.button>
  );
}

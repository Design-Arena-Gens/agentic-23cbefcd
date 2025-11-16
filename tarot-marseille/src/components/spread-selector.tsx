'use client';

import { motion } from "framer-motion";
import clsx from "clsx";
import { spreadList } from "@/lib/spreads";
import type { SpreadType } from "@/lib/spreads";

interface SpreadSelectorProps {
  value: SpreadType;
  onChange: (spread: SpreadType) => void;
}

export function SpreadSelector({ value, onChange }: SpreadSelectorProps) {
  return (
    <motion.div layout className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {spreadList.map((spread) => {
        const isActive = spread.id === value;
        return (
          <motion.button
            type="button"
            key={spread.id}
            layout
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onChange(spread.id)}
            className={clsx(
              "group relative flex h-full flex-col gap-4 rounded-3xl border p-5 text-left transition",
              "border-white/10 bg-white/5 backdrop-blur",
              isActive
                ? "shadow-lg shadow-purple-600/30 ring-2 ring-purple-300/70"
                : "hover:border-white/30 hover:bg-white/10",
            )}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-wide text-white/60">
                  {spread.subtitle}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-white">{spread.name}</h3>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-sm font-medium text-white/70">
                {spread.size}
              </span>
            </div>
            <p className="text-sm text-white/70">{spread.description}</p>
            <ul className="mt-auto flex flex-wrap gap-2 text-xs text-white/50">
              {spread.keywords.map((word) => (
                <li
                  key={word}
                  className="rounded-full border border-white/15 px-2 py-1"
                >
                  {word}
                </li>
              ))}
            </ul>
            {isActive && (
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-400/20 via-transparent to-indigo-500/30" />
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}

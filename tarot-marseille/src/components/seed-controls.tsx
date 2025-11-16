'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SparkleIcon, RefreshCwIcon } from "lucide-react";
import { generateSeed } from "@/lib/random";

interface SeedControlsProps {
  seed: string;
  onSeedChange: (seed: string) => void;
  onExecuteDraw: () => void;
}

export function SeedControls({ seed, onSeedChange, onExecuteDraw }: SeedControlsProps) {
  const [localSeed, setLocalSeed] = useState(seed);

  useEffect(() => {
    setLocalSeed(seed);
  }, [seed]);

  const applySeed = (value: string) => {
    setLocalSeed(value);
    onSeedChange(value);
  };

  const randomize = () => {
    const next = generateSeed();
    applySeed(next);
  };

  return (
    <motion.div
      layout
      className="grid w-full gap-3 rounded-3xl border border-white/10 bg-black/10 p-4 backdrop-blur md:grid-cols-[1fr_auto_auto]"
    >
      <label className="flex flex-col gap-2 text-sm text-white/70 md:col-span-1">
        graine (seed)
        <input
          value={localSeed}
          onChange={(event) => applySeed(event.target.value)}
          placeholder="Définir une graine..."
          className="h-12 w-full rounded-2xl border border-white/20 bg-white/5 px-4 text-base text-white outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-400/50"
        />
      </label>
      <div className="flex items-end gap-3 md:justify-end">
        <motion.button
          type="button"
          onClick={randomize}
          whileTap={{ scale: 0.96 }}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/20 px-4 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/10"
        >
          <RefreshCwIcon className="h-4 w-4" />
          Aléatoire
        </motion.button>
        <motion.button
          type="button"
          onClick={onExecuteDraw}
          whileTap={{ scale: 0.96 }}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-400 via-purple-500 to-rose-500 px-6 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 transition hover:brightness-110"
        >
          <SparkleIcon className="h-4 w-4" />
          Tirer les cartes
        </motion.button>
      </div>
    </motion.div>
  );
}

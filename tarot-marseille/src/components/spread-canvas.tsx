'use client';

import { motion } from "framer-motion";
import clsx from "clsx";
import type { DrawnTarotCard, SpreadDefinition } from "@/lib/spreads";
import { TarotCard } from "./tarot-card";

interface SpreadCanvasProps {
  spread: SpreadDefinition;
  cards: DrawnTarotCard[];
  onToggleCard: (uid: string) => void;
  onRevealAll: () => void;
  onReset: () => void;
}

export function SpreadCanvas({
  spread,
  cards,
  onToggleCard,
  onRevealAll,
  onReset,
}: SpreadCanvasProps) {
  const hasCards = cards.length > 0;

  return (
    <section className="relative flex w-full flex-col gap-4 rounded-[40px] border border-white/10 bg-gradient-to-b from-black/40 via-black/70 to-black/90 p-6 shadow-2xl shadow-black/50 backdrop-blur-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 text-white/70">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-white/50">Disposition</p>
          <h2 className="text-2xl font-semibold text-white">{spread.name}</h2>
          <p className="mt-1 max-w-xl text-sm text-white/70">{spread.description}</p>
        </div>
        {hasCards && (
          <div className="flex gap-2">
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={onRevealAll}
              className="rounded-2xl border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/80 transition hover:border-white/40 hover:bg-white/10"
            >
              Tout révéler
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={onReset}
              className="rounded-2xl border border-rose-300/40 bg-rose-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-rose-200 transition hover:border-rose-200/70 hover:bg-rose-500/20"
            >
              Réinitialiser
            </motion.button>
          </div>
        )}
      </div>

      <div className="relative mt-4 grid min-h-[480px] place-items-center overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6 shadow-inner shadow-black/60">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.35),transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(244,114,182,0.25),transparent_65%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.05),transparent_35%),linear-gradient(-115deg,rgba(255,255,255,0.05),transparent_45%)]" />
          <div className="absolute inset-0 opacity-40 mix-blend-overlay [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08),rgba(255,255,255,0.08)1px,transparent_1px,transparent_16px)] [background-size:16px_16px]" />
        </div>

        <div className="relative h-full w-full">
          {spread.positions.map((position) => {
            const card = cards.find((item) => item.positionId === position.id);
            const hasCard = Boolean(card);
            return (
              <div
                key={position.id}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 text-center text-white/60"
                style={{ left: `${position.x}%`, top: `${position.y}%` }}
              >
                {!card && (
                  <motion.div
                    layoutId={`slot-${position.id}`}
                    className={clsx(
                      "h-[210px] w-[140px] rounded-3xl border border-dashed border-white/20 transition md:h-[240px] md:w-[160px]",
                      position.emphasis === "primary"
                        ? "border-white/40 bg-white/5"
                        : "bg-white/0",
                    )}
                  >
                    <div className="h-full w-full rounded-3xl bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.2),transparent_70%)]" />
                  </motion.div>
                )}
                <motion.div
                  className={clsx(
                    "transform rounded-full bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.2em] transition",
                    hasCard ? "translate-y-[150px]" : "translate-y-[125px]",
                  )}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {position.title}
                </motion.div>
              </div>
            );
          })}

          {cards.map((card, index) => {
            const position = spread.positions.find((pos) => pos.id === card.positionId);
            if (!position) return null;
            return (
              <TarotCard
                key={card.uid}
                card={card}
                position={position}
                index={index}
                onToggle={onToggleCard}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

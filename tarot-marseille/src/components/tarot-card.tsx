'use client';

import { motion } from "framer-motion";
import clsx from "clsx";
import type { DrawnTarotCard, SpreadPosition } from "@/lib/spreads";

interface TarotCardProps {
  card: DrawnTarotCard;
  position: SpreadPosition;
  index: number;
  onToggle: (uid: string) => void;
}

export function TarotCard({ card, position, index, onToggle }: TarotCardProps) {
  const { palette } = card;
  const rotation = card.reversed ? 180 : position.rotation ?? 0;

  return (
    <motion.button
      type="button"
      className="group absolute flex h-[200px] w-[130px] -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none touch-manipulation md:h-[230px] md:w-[150px]"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      onClick={() => onToggle(card.uid)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.div
        className="relative h-full w-full"
        animate={{ rotateY: card.revealed ? 0 : 180 }}
        transition={{ duration: 0.6, ease: [0.68, -0.55, 0.27, 1.55] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <CardFront
          palette={palette}
          rotation={rotation}
          card={card}
          position={position}
        />
        <CardBack palette={palette} />
      </motion.div>
    </motion.button>
  );
}

function CardFront({
  card,
  palette,
  rotation,
  position,
}: {
  card: DrawnTarotCard;
  palette: DrawnTarotCard["palette"];
  rotation: number;
  position: SpreadPosition;
}) {
  return (
    <div
      className="absolute inset-0 grid rounded-3xl border border-white/30 bg-white/90 p-4 text-left shadow-xl shadow-indigo-900/20 [backface-visibility:hidden]"
      style={{
        transform: `rotateY(0deg) rotate(${rotation}deg)`,
      }}
    >
      <div
        className="absolute inset-0 rounded-3xl opacity-60 blur-xl"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${palette.highlight}55, transparent 60%), radial-gradient(circle at 70% 80%, ${palette.primary}55, transparent 65%)`,
        }}
      />
      <div
        className="absolute inset-[1px] rounded-[26px]"
        style={{
          background: `linear-gradient(145deg, ${palette.primary}, ${palette.secondary})`,
          opacity: 0.18,
        }}
      />
      <div className="relative flex flex-col gap-4">
        <div className="flex items-center justify-between text-xs uppercase tracking-wider text-slate-700">
          <span>{card.roman}</span>
          <span>{card.arcana === "major" ? "Arcanes majeurs" : "Arcanes mineurs"}</span>
        </div>
        <div className="relative h-28 overflow-hidden rounded-2xl border border-white/40 shadow-inner shadow-black/10">
          <span
            className="absolute inset-0"
            style={{
              background: `linear-gradient(160deg, ${palette.primary}aa, ${palette.secondary}aa)`,
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.6),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.4),transparent_60%)] mix-blend-screen" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center text-xs tracking-wide text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
            <p className="font-semibold uppercase">{position.title}</p>
            <p className="max-w-[80%] text-[11px] font-light leading-tight">
              {position.description}
            </p>
          </div>
        </div>
        <div className="relative">
          <h4 className="text-sm font-semibold text-slate-900">{card.name}</h4>
          <p className="mt-1 text-xs leading-relaxed text-slate-700">
            {card.description}
          </p>
        </div>
        <ul className="mt-auto flex flex-wrap gap-2 text-[11px] uppercase tracking-wide text-slate-700">
          {card.keywords.map((keyword) => (
            <li
              key={keyword}
              className={clsx(
                "rounded-full border px-2 py-1",
                card.reversed ? "border-rose-200 bg-rose-50" : "border-slate-300 bg-white/60",
              )}
            >
              {keyword}
            </li>
          ))}
        </ul>
        {card.reversed && (
          <span className="absolute right-4 top-4 rounded-full bg-black/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-rose-600">
            Renversée
          </span>
        )}
      </div>
    </div>
  );
}

function CardBack({ palette }: { palette: DrawnTarotCard["palette"] }) {
  return (
    <div
      className="absolute inset-0 rounded-3xl border border-white/40 bg-gradient-to-br from-slate-800 via-slate-900 to-black p-4 shadow-2xl shadow-black/40 [backface-visibility:hidden]"
      style={{ transform: "rotateY(180deg)" }}
    >
      <div className="h-full w-full rounded-2xl border border-white/10 bg-black/60 backdrop-blur">
        <div
          className="relative flex h-full items-center justify-center overflow-hidden rounded-2xl"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${palette.primary}40 0%, transparent 60%), radial-gradient(circle at 20% 20%, ${palette.highlight}35 0%, transparent 50%), radial-gradient(circle at 80% 80%, ${palette.secondary}45 0%, transparent 50%)`,
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.16),transparent_55%)]" />
          <div className="grid h-full w-full place-items-center font-serif text-sm uppercase tracking-[0.35em] text-white/70">
            ✶ Marseille ✶
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SparkleIcon, Wand2Icon } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SpreadSelector } from "@/components/spread-selector";
import { SeedControls } from "@/components/seed-controls";
import { SpreadCanvas } from "@/components/spread-canvas";
import { tarotDeck } from "@/data/tarot";
import { createSeededRng, normalizeSeed, shuffleWithRng } from "@/lib/random";
import { DrawnTarotCard, getSpreadById, type SpreadType } from "@/lib/spreads";

const heroHighlights = [
  { title: "UX mystique", text: "Animations fluides, interface responsive et raffinée." },
  { title: "Tirages multiples", text: "Carte unique, croix, linéaire et grand mandala de 10 cartes." },
  { title: "Seed personnalisable", text: "Rejouez un tirage grâce à une graine pseudo-aléatoire." },
];

export default function Home() {
  const [seed, setSeed] = useState(() => normalizeSeed(undefined));
  const [activeSeed, setActiveSeed] = useState(() => normalizeSeed(undefined));
  const [spreadId, setSpreadId] = useState<SpreadType>("single");
  const [cards, setCards] = useState<DrawnTarotCard[]>([]);

  const spread = useMemo(() => getSpreadById(spreadId), [spreadId]);

  const revealedCount = cards.filter((card) => card.revealed).length;

  const handleDraw = () => {
    const normalizedSeed = normalizeSeed(seed);
    const signature = `${normalizedSeed}::${spreadId}`;
    const rng = createSeededRng(signature);
    const shuffled = shuffleWithRng(tarotDeck, rng);

    const selection: DrawnTarotCard[] = spread.positions.map((position, index) => {
      const source = shuffled[index];
      return {
        ...source,
        uid: `${signature}-${source.id}-${index}`,
        positionId: position.id,
        revealed: false,
        reversed: rng() > 0.5,
        order: index,
      };
    });

    setActiveSeed(normalizedSeed);
    setCards(selection);
  };

  const handleToggleCard = (uid: string) => {
    setCards((prev) =>
      prev.map((card) =>
        card.uid === uid ? { ...card, revealed: !card.revealed } : card,
      ),
    );
  };

  const handleRevealAll = () => {
    setCards((prev) => prev.map((card) => ({ ...card, revealed: true })));
  };

  const handleReset = () => {
    setCards([]);
  };

  return (
    <main className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-10 px-5 py-10 md:px-10 lg:py-16">
      <div className="aurora" />
      <div className="mystic-noise" />
      <header className="relative flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/5 px-6 py-5 text-white shadow-lg shadow-purple-900/20 backdrop-blur">
        <div>
          <p className="mystic-title text-xs text-white/60">Tarot de Marseille</p>
          <h1 className="mt-2 text-3xl font-semibold md:text-4xl">
            Atelier des Arcanes · tirages interactifs
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-white/70">
            Explorez les arcanes majeurs et mineurs à travers des tirages animés, une ambiance
            mystique et une graine personnalisable pour rejouer vos lectures. Module d’interprétation
            IA prêt à être branché.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <motion.section
        layout
        className="relative grid gap-6 rounded-[40px] border border-white/10 bg-black/30 p-6 text-white shadow-2xl shadow-black/40 backdrop-blur-xl md:grid-cols-[1.15fr_0.85fr]"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col justify-between gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/60">
              <SparkleIcon className="h-4 w-4" />
              Tirages vivants
            </div>
            <h2 className="mt-5 text-3xl font-semibold md:text-[40px] md:leading-[1.05]">
              Conçu pour l’expérience, pensé pour l’interprétation future.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Chaque composant est orchestré pour accueillir un module d’analyse par IA : cartes
              enrichies, positions contextualisées, métadonnées prêtes à l’emploi. Vivez déjà
              l’immersion des arcanes tout en préparant la suite.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {heroHighlights.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/70"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-white/50">{item.title}</p>
                <p className="mt-3 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-purple-500/20 via-indigo-900/40 to-black p-6"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(244,114,182,0.4),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(129,140,248,0.35),transparent_65%)] opacity-80" />
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.12),transparent_40%)]" />
          <div className="relative flex h-full w-full flex-col justify-between text-white/80">
            <div>
              <span className="flex items-center gap-2 text-xs uppercase tracking-[0.4em]">
                <Wand2Icon className="h-4 w-4" />
                Seed active
              </span>
              <p className="mt-3 break-all rounded-2xl border border-white/20 bg-black/30 px-4 py-3 text-sm font-mono text-white/70 shadow-inner shadow-black/30">
                {activeSeed}
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-white/70">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                Statut de tirage
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span>
                  {cards.length === 0
                    ? "Aucun tirage en cours."
                    : `${revealedCount}/${cards.length} cartes révélées.`}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                  {spread.name}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>

      <SpreadSelector value={spreadId} onChange={setSpreadId} />

      <SeedControls
        seed={seed}
        onSeedChange={setSeed}
        onExecuteDraw={handleDraw}
      />

      <SpreadCanvas
        spread={spread}
        cards={cards}
        onToggleCard={handleToggleCard}
        onRevealAll={handleRevealAll}
        onReset={handleReset}
      />

      <motion.section
        layout
        className="mb-20 grid gap-6 rounded-[36px] border border-white/10 bg-white/5 p-6 text-white shadow-xl shadow-black/40 backdrop-blur lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            Interprétation assistée
          </p>
          <h3 className="mt-2 text-2xl font-semibold">Module IA · zone de préparation</h3>
          <p className="mt-3 text-sm text-white/70">
            L’architecture du tirage expose toutes les données nécessaires à un moteur d’interprétation
            IA : identifiant unique, arcane, polarité, position et métadonnées lexicales. Connectez
            facilement un modèle pour générer des lectures contextualisées.
          </p>
          <ul className="mt-4 grid gap-2 text-sm text-white/65">
            <li className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
              ⮞ Accessibilité des tirages via un simple hook React.
            </li>
            <li className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
              ⮞ Métadonnées structurées prêtes à être sérialisées.
            </li>
            <li className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
              ⮞ Hooks pour écouter les changements de seed et de spread.
            </li>
          </ul>
        </div>
        <div className="relative rounded-[30px] border border-white/10 bg-black/30 p-6 font-mono text-xs text-white/70">
          <div className="absolute inset-0 rounded-[30px] bg-[radial-gradient(circle_at_20%_20%,rgba(129,140,248,0.25),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(244,114,182,0.3),transparent_60%)] opacity-80" />
          <pre className="relative whitespace-pre-wrap break-words">
{`{
  "spread": "${spread.id}",
  "seed": "${activeSeed}",
  "cards": [
    ${cards
      .slice(0, 3)
      .map(
        (card) =>
          `{
      "uid": "${card.uid}",
      "name": "${card.name}",
      "position": "${card.positionId}",
      "reversed": ${card.reversed}
    }`,
      )
      .join(",\n    ")}
    ${cards.length > 3 ? "… etc" : ""}
  ]
}`}
          </pre>
        </div>
      </motion.section>
    </main>
  );
}

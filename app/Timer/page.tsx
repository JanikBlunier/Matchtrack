"use client";

import { useEffect, useRef, useState } from "react";
import { useGameTimerContext } from "@/components/match/timer/GameTimerContext";

export default function TimerPage() {
    const {
        running,
        mainFormatted,
        showExtra,
        extraFormatted,
        start,
        pause,
        reset,
        setTime,
        startLabel,
        pauseLabel,
    } = useGameTimerContext();

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [showHeader, setShowHeader] = useState(false);
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = sentinelRef.current;
        if (!el) return;

        const obs = new IntersectionObserver(([entry]) => {
            setShowHeader(!entry.isIntersecting);
        });

        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div className="w-full">
            <header
                className={[
                    "sticky top-0 z-40 border-b bg-white/90 backdrop-blur transition-transform duration-200",
                    showHeader ? "translate-y-0" : "-translate-y-full",
                ].join(" ")}
            >
                <div className="px-4 py-2 flex items-center justify-between">
                    <div className="font-mono tabular-nums text-lg">
                        {mainFormatted}
                        {showExtra && (
                            <span className="ml-2 text-xs text-gray-600">{extraFormatted}</span>
                        )}
                    </div>

                    <div className="flex gap-2">
                        {!running ? (
                            <button
                                onClick={start}
                                className="px-3 py-1.5 rounded-md bg-black text-white text-sm"
                            >
                                {startLabel}
                            </button>
                        ) : (
                            <button
                                onClick={pause}
                                className="px-3 py-1.5 rounded-md bg-gray-200 text-sm"
                            >
                                {pauseLabel}
                            </button>
                        )}

                        <button
                            onClick={() => setConfirmOpen(true)}
                            className="px-3 py-1.5 rounded-md bg-red-600 text-white text-sm"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </header>

            <div ref={sentinelRef} className="h-px" />

            <section className="px-4 pt-2 pb-8">
                <div className="flex flex-col items-center">
                    <div className="relative font-mono tabular-nums text-7xl">
                        {mainFormatted}
                        {showExtra && (
                            <span className="absolute -top-2 -right-12 text-sm text-gray-600">
                {extraFormatted}
              </span>
                        )}
                    </div>

                    <div className="mt-5 flex gap-3">
                        {!running ? (
                            <button onClick={start} className="px-5 py-2 rounded-lg bg-black text-white">
                                {startLabel}
                            </button>
                        ) : (
                            <button onClick={pause} className="px-5 py-2 rounded-lg bg-gray-200">
                                {pauseLabel}
                            </button>
                        )}

                        <button
                            onClick={() => setConfirmOpen(true)}
                            className="px-5 py-2 rounded-lg bg-red-600 text-white"
                        >
                            Reset
                        </button>
                    </div>

                    <div className="mt-6 flex gap-2 text-xs">
                        <button onClick={() => setTime(44, 50)} className="px-3 py-1 rounded border">
                            Dev: 44:50
                        </button>
                        <button onClick={() => setTime(89, 50)} className="px-3 py-1 rounded border">
                            Dev: 89:50
                        </button>
                    </div>
                </div>
            </section>

            {confirmOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-sm flex flex-col gap-4">
                        <div className="text-lg font-semibold">Spielzeit zurücksetzen?</div>
                        <div className="text-sm text-gray-600">Die aktuelle Spielzeit geht verloren.</div>

                        <div className="flex gap-2 justify-end">
                            <button onClick={() => setConfirmOpen(false)} className="px-4 py-2 rounded-lg border">
                                Abbrechen
                            </button>
                            <button
                                onClick={() => {
                                    reset();
                                    setConfirmOpen(false);
                                }}
                                className="px-4 py-2 rounded-lg bg-red-600 text-white"
                            >
                                Ja, resetten
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
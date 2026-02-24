import React from "react";

type ScoreboardProps = {
    homeName: string;
    awayName: string;
    homeScore: number;
    awayScore: number;
};

export default function Scoreboard({
                                       homeName,
                                       awayName,
                                       homeScore,
                                       awayScore,
                                   }: ScoreboardProps) {
    return (
        <section className="w-full border-y border-gray-200 bg-white">
            <div className="mx-auto w-full max-w-xl px-4 py-6">
                <p className="text-center text-xs tracking-[0.22em] text-gray-400">
                    SPIELSTAND
                </p>

                <div className="mt-4 flex items-end justify-center gap-6">
                    <span className="text-5xl font-semibold tabular-nums text-gray-900">
                        {homeScore}
                    </span>

                    <span className="pb-1 text-2xl font-light text-gray-300">:</span>

                    <span className="text-5xl font-semibold tabular-nums text-gray-900">
                        {awayScore}
                    </span>
                </div>

                <div className="mt-4 grid grid-cols-2">
                    <p className="text-center text-sm text-gray-500">{homeName}</p>
                    <p className="text-center text-sm text-gray-500">{awayName}</p>
                </div>
            </div>
        </section>
    );
}
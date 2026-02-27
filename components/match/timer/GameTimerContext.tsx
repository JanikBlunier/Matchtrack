"use client";

import React, { createContext, useContext } from "react";
import { useGameTimer } from "@/app/Timer/useGameTimer";

type Ctx = ReturnType<typeof useGameTimer> & {
    minuteNow: number;
    secondNow: number;
};

const GameTimerContext = createContext<Ctx | null>(null);

export function GameTimerProvider({
                                      children,
                                      halfMinutes = 45,
                                  }: {
    children: React.ReactNode;
    halfMinutes?: number;
}) {
    const timer = useGameTimer({ halfMinutes });

    const [mmStr, ssStr] = timer.mainFormatted.split(":");
    const rawMinute = Number(mmStr || "0");
    const secondNow = Number(ssStr || "0");

    const minuteNow =
        rawMinute === 0 && secondNow === 0
            ? 0
            : rawMinute + 1;

    const value: Ctx = {
        ...timer,
        minuteNow,
        secondNow,
    };

    return (
        <GameTimerContext.Provider value={value}>
            {children}
        </GameTimerContext.Provider>
    );
}

export function useGameTimerContext() {
    const ctx = useContext(GameTimerContext);
    if (!ctx) throw new Error("useGameTimerContext must be used within GameTimerProvider");
    return ctx;
}
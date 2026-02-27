"use client";

import React, { createContext, useContext, useMemo, useReducer } from "react";
import { canAddPlayerEvent } from "@/lib/matchRules"; // ✅ NEU

export type EventType = "goal" | "yellow" | "red" | "sub";

export type MatchEvent = {
    id: string;
    minute: number;
    team: "home" | "away";
    type: EventType;

    player?: string;
    outPlayer?: string;
    inPlayer?: string;
};

type State = {
    events: MatchEvent[];
};

type Action =
    | { type: "ADD_EVENT"; payload: MatchEvent }
    | { type: "CLEAR_EVENTS" };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "ADD_EVENT": {
            const next = action.payload;

            // ✅ NEU: Regeln anwenden (nur goal/yellow/red haben player)
            if (next.type !== "sub") {
                const ok = canAddPlayerEvent(next.type, next.player, state.events);
                if (!ok) return state; // blockieren
            }

            return {
                events: [...state.events, next].sort((a, b) => a.minute - b.minute),
            };
        }

        case "CLEAR_EVENTS":
            return { events: [] };

        default:
            return state;
    }
}

type Score = {
    home: number;
    away: number;
};

type Ctx = {
    events: MatchEvent[];
    score: Score;
    addEvent: (evt: Omit<MatchEvent, "id">) => void;
    clearEvents: () => void;
};

const MatchEventsContext = createContext<Ctx | null>(null);

function uid() {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function calculateScore(events: MatchEvent[]): Score {
    let home = 0;
    let away = 0;

    for (const e of events) {
        if (e.type !== "goal") continue;
        if (e.team === "home") home++;
        if (e.team === "away") away++;
    }

    return { home, away };
}

export function MatchEventsProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, { events: [] });

    const score = useMemo(() => calculateScore(state.events), [state.events]);

    const value = useMemo<Ctx>(() => {
        return {
            events: state.events,
            score,
            addEvent: (evt) =>
                dispatch({
                    type: "ADD_EVENT",
                    payload: { ...evt, id: uid() },
                }),
            clearEvents: () => dispatch({ type: "CLEAR_EVENTS" }),
        };
    }, [state.events, score]);

    return (
        <MatchEventsContext.Provider value={value}>
            {children}
        </MatchEventsContext.Provider>
    );
}

export function useMatchEvents() {
    const ctx = useContext(MatchEventsContext);
    if (!ctx) throw new Error("useMatchEvents must be used within MatchEventsProvider");
    return ctx;
}
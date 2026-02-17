"use client";

import React, { createContext, useContext, useMemo, useReducer } from "react";

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
        case "ADD_EVENT":
            return {
                events: [...state.events, action.payload].sort(
                    (a, b) => a.minute - b.minute
                ),
            };

        case "CLEAR_EVENTS":
            return { events: [] };

        default:
            return state;
    }
}

type Ctx = {
    events: MatchEvent[];
    addEvent: (evt: Omit<MatchEvent, "id">) => void;
    clearEvents: () => void;
};

const MatchEventsContext = createContext<Ctx | null>(null);

function uid() {
    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function MatchEventsProvider({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    const [state, dispatch] = useReducer(reducer, { events: [] });

    const value = useMemo<Ctx>(() => {
        return {
            events: state.events,
            addEvent: (evt) =>
                dispatch({
                    type: "ADD_EVENT",
                    payload: { ...evt, id: uid() },
                }),
            clearEvents: () => dispatch({ type: "CLEAR_EVENTS" }),
        };
    }, [state.events]);

    return (
        <MatchEventsContext.Provider value={value}>
            {children}
        </MatchEventsContext.Provider>
    );
}

export function useMatchEvents() {
    const ctx = useContext(MatchEventsContext);
    if (!ctx)
        throw new Error(
            "useMatchEvents must be used within MatchEventsProvider"
        );
    return ctx;
}
"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Half = "FIRST" | "SECOND";

type Options = {
    halfMinutes?: number;
};

export function useGameTimer(options: Options = {}) {
    const halfMinutes = options.halfMinutes ?? 45;
    const HALF = halfMinutes * 60; // 2700
    const FULL = HALF * 2;         // 5400

    const [half, setHalf] = useState<Half>("FIRST");
    const [running, setRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);

    const intervalRef = useRef<number | null>(null);

    const clearTick = () => {
        if (intervalRef.current !== null) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    useEffect(() => {
        if (!running) {
            clearTick();
            return;
        }

        clearTick();

        intervalRef.current = window.setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);

        return clearTick;
    }, [running]);

    const start = () => setRunning(true);

    const pause = () => {
        setRunning(false);

        if (half === "FIRST" && seconds > HALF) {
            setHalf("SECOND");
            setSeconds(HALF);
        }
    };

    const reset = () => {
        setRunning(false);
        clearTick();
        setHalf("FIRST");
        setSeconds(0);
    };

    const setTime = (mm: number, ss: number = 0) => {
        const total = mm * 60 + ss;

        setRunning(false);
        clearTick();

        if (total < HALF) {
            setHalf("FIRST");
            setSeconds(total);
            return;
        }

        if (total >= HALF && total < FULL) {
            setHalf("SECOND");
            setSeconds(total);
            return;
        }

        setHalf("SECOND");
        setSeconds(FULL);
    };

    const format = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };

    const cap = half === "FIRST" ? HALF : FULL;

    const mainDisplaySeconds = Math.min(seconds, cap);
    const mainFormatted = useMemo(
        () => format(mainDisplaySeconds),
        [mainDisplaySeconds]
    );

    const displayMinute = useMemo(() => {
        return Math.floor(mainDisplaySeconds / 60) + 1;
    }, [mainDisplaySeconds]);

    const extraSeconds = Math.max(0, seconds - cap);
    const showExtra = running && extraSeconds > 0;
    const extraFormatted = useMemo(
        () => `+${format(extraSeconds)}`,
        [extraSeconds]
    );

    return {
        half,
        running,
        mainFormatted,
        displayMinute,
        showExtra,
        extraFormatted,

        start,
        pause,
        reset,
        setTime,

        startLabel: "Start",
        pauseLabel: "Pause",
    };
}
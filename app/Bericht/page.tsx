"use client";

import { useMemo, useState } from "react";
import { useMatchEvents } from "@/components/match/events/MatchEventsContext";
import ExportPdfButton from "@/components/report/ExportPdfButton";

export default function BerichtPage() {
    const [bericht, setBericht] = useState("");
    const [isConfirmed, setIsConfirmed] = useState(false);

    const { events } = useMatchEvents();

    const homeName = "Home Team";
    const awayName = "Away Team";

    const homeScore = useMemo(() => {
        return events.filter(
            (e) => e.type === "goal" && e.team === "home"
        ).length;
    }, [events]);

    const awayScore = useMemo(() => {
        return events.filter(
            (e) => e.type === "goal" && e.team === "away"
        ).length;
    }, [events]);

    const berichtIsValid = bericht.trim().length > 0;
    const canExport = berichtIsValid && isConfirmed;

    function handleAfterExport() {
        setBericht("");
        setIsConfirmed(false);
    }

    return (
        <div className="min-h-screen bg-white p-4 pb-24">
            <div className="mx-auto max-w-xl">
                <h1 className="mb-3 text-xl font-semibold">Spielbericht</h1>

                <div className="rounded-xl border border-neutral-200 bg-white p-4">
                    <p className="mb-3 text-sm text-neutral-600">
                        Hier kann der offizielle Spielbericht eingetragen werden.
                    </p>

                    <textarea
                        value={bericht}
                        onChange={(e) => setBericht(e.target.value)}
                        placeholder="Bericht eingeben..."
                        className="h-56 w-full resize-none rounded-lg border border-neutral-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                    />

                    {!berichtIsValid && (
                        <p className="mt-2 text-sm text-red-600">
                            Bitte einen Spielbericht eingeben.
                        </p>
                    )}

                    <label className="mt-4 flex items-start gap-3 text-sm text-neutral-700">
                        <input
                            type="checkbox"
                            checked={isConfirmed}
                            onChange={(e) => setIsConfirmed(e.target.checked)}
                            className="mt-0.5 h-4 w-4 rounded border-neutral-300"
                        />
                        <span>
                            Ich bestätige, dass der Spielbericht geprüft wurde und exportiert werden darf.
                        </span>
                    </label>

                    {!isConfirmed && (
                        <p className="mt-2 text-sm text-red-600">
                            Bitte die Bestätigung aktivieren.
                        </p>
                    )}
                </div>

                <ExportPdfButton
                    homeName={homeName}
                    awayName={awayName}
                    homeScore={homeScore}
                    awayScore={awayScore}
                    bericht={bericht}
                    disabled={!canExport}
                    onAfterExport={handleAfterExport}
                />
            </div>
        </div>
    );
}
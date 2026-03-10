"use client";

import { pdf } from "@react-pdf/renderer";
import MatchReportPdf from "@/components/pdf/MatchReportPdf";
import { useMatchEvents } from "@/components/match/events/MatchEventsContext";
import { useGameTimerContext } from "@/components/match/timer/GameTimerContext";

type Props = {
    homeName: string;
    awayName: string;
    homeScore: number;
    awayScore: number;
    bericht: string;
    disabled?: boolean;
    onAfterExport?: () => void;
};

export default function ExportPdfButton({
                                            homeName,
                                            awayName,
                                            homeScore,
                                            awayScore,
                                            bericht,
                                            disabled = false,
                                            onAfterExport,
                                        }: Props) {
    const { events, clearEvents } = useMatchEvents();
    const { reset } = useGameTimerContext();

    async function exportPdf() {
        if (disabled) return;
        if (!bericht.trim()) return;

        const blob = await pdf(
            <MatchReportPdf
                homeName={homeName}
                awayName={awayName}
                homeScore={homeScore}
                awayScore={awayScore}
                bericht={bericht}
                events={events}
            />
        ).toBlob();

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `match-report-${homeName}-vs-${awayName}.pdf`;
        a.click();

        URL.revokeObjectURL(url);

        clearEvents();
        reset();
        onAfterExport?.();
    }

    return (
        <button
            onClick={exportPdf}
            disabled={disabled}
            className={`mt-4 w-full rounded-xl px-4 py-3 text-white transition ${
                disabled
                    ? "cursor-not-allowed bg-neutral-400"
                    : "bg-green-600 hover:bg-green-700"
            }`}
        >
            PDF exportieren & neues Spiel starten
        </button>
    );
}
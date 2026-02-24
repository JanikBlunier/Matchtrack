"use client";

import Scoreboard from "@/components/scoreboard/Scoreboard";
import { useMatchEvents } from "@/components/match/events/MatchEventsContext";

export default function MatchPage() {
    const { score } = useMatchEvents();

    const homeName = "Team A";
    const awayName = "Team B";

    return (
        <Scoreboard
            homeName={homeName}
            awayName={awayName}
            homeScore={score.home}
            awayScore={score.away}
        />
    );
}
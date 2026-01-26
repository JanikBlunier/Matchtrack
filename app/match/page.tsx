import Scoreboard from "@/components/scoreboard/Scoreboard";

export default function MatchPage() {
    const homeName = "Team A";
    const awayName = "Team B";
    const homeScore = 2;
    const awayScore = 1;

    return (
            <Scoreboard
                homeName={homeName}
                awayName={awayName}
                homeScore={homeScore}
                awayScore={awayScore}
            />
    );
}

import Scoreboard from "@/components/scoreboard/Scoreboard";

export default function MatchPage() {
    const homeName = "Team A";
    const awayName = "Team B";
    const homeScore = 2;
    const awayScore = 1;

    return (
        <main className="min-h-dvh bg-white">
            <Scoreboard
                homeName={homeName}
                awayName={awayName}
                homeScore={homeScore}
                awayScore={awayScore}
            />

            <section className="mx-auto w-full max-w-xl px-4 py-6">
                <p className="text-xs tracking-[0.22em] text-gray-400">
                    SPIELEREIGNISSE
                </p>
            </section>
        </main>
    );
}

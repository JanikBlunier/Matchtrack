import MatchTimeline, { type MatchEvent } from "@/components/match/MatchTimeline";

export default function TimelineSection() {
    const events: MatchEvent[] = [
        { minute: 12, team: "home", type: "goal", player: "Leon Fischer" },
        { minute: 23, team: "away", type: "yellow", player: "Felix Hoffmann" },
        { minute: 35, team: "away", type: "goal", player: "Noah Bauer" },
        { minute: 42, team: "home", type: "goal", player: "Paul Becker" },
        {
            minute: 58,
            team: "home",
            type: "sub",
            outPlayer: "Jan Weber",
            inPlayer: "Tom Schmidt",
        },
        { minute: 67, team: "away", type: "yellow", player: "Tom Schmidt" },
    ];

    return (
        <main className="mx-auto w-full max-w-xl px-4 py-6">
            <MatchTimeline events={events} />
        </main>
    );
}

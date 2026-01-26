type EventType = "goal" | "yellow" | "sub";

export type MatchEvent = {
    minute: number;
    team: "home" | "away";
    type: EventType;
    player?: string;
    outPlayer?: string;
    inPlayer?: string;
};

type MatchTimelineProps = {
    events: MatchEvent[];
};

export default function MatchTimeline({ events }: MatchTimelineProps) {
    return (
        <section className="w-full">
            <p className="mb-6 text-xs tracking-[0.22em] text-gray-400">
                SPIELEREIGNISSE
            </p>

            <div className="flex flex-col gap-6">
                {events.map((event, index) => {
                    const isHome = event.team === "home";

                    return (
                        <div
                            key={`${event.minute}-${event.team}-${event.type}-${index}`}
                            className="grid grid-cols-[1fr_auto_1fr] items-center"
                        >
                            {/* Left (Home) */}
                            <div className="flex justify-end">
                                {isHome ? <EventCard event={event} /> : null}
                            </div>

                            {/* Minute */}
                            <div className="mx-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
                                {event.minute}'
                            </div>

                            {/* Right (Away) */}
                            <div className="flex justify-start">
                                {!isHome ? <EventCard event={event} /> : null}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

function EventCard({ event }: { event: MatchEvent }) {
    if (event.type === "goal") {
        return (
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm">
                <span className="text-base">⚽</span>
                <span className="text-gray-900">{event.player}</span>
            </div>
        );
    }

    if (event.type === "yellow") {
        return (
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm">
                <span className="text-base">🟨</span>
                <span className="text-gray-900">{event.player}</span>
            </div>
        );
    }

    // sub
    return (
        <div className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm">
            <div className="text-red-500">Raus: {event.outPlayer}</div>
            <div className="text-green-600">Rein: {event.inPlayer}</div>
        </div>
    );
}

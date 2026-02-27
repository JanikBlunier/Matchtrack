import { MatchEvent } from "./events/MatchEventsContext";

export type MatchTimelineProps = {
    events: MatchEvent[];
};

export default function MatchTimeline({ events }: MatchTimelineProps) {
    return (
        <section className="w-full">
            <p className="mb-6 text-xs tracking-[0.22em] text-gray-400">
                SPIELEREIGNISSE
            </p>

            {events.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-200 bg-white px-4 py-6 text-sm text-gray-500">
                    Noch keine Events erfasst.
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    {events.map((event) => {
                        const isHome = event.team === "home";

                        return (
                            <div
                                key={event.id}
                                className="grid grid-cols-[1fr_auto_1fr] items-center"
                            >
                                <div className="flex justify-end">
                                    {isHome ? <EventCard event={event} /> : null}
                                </div>

                                <div className="mx-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
                                    {event.minute}
                                </div>

                                <div className="flex justify-start">
                                    {!isHome ? <EventCard event={event} /> : null}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

function EventCard({ event }: { event: MatchEvent }) {
    if (event.type === "goal") {
        return (
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm">
                <span>⚽</span>
                <span>{event.player}</span>
            </div>
        );
    }

    if (event.type === "yellow") {
        return (
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm">
                <span>🟨</span>
                <span>{event.player}</span>
            </div>
        );
    }

    if (event.type === "red") {
        return (
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm">
                <span>🟥</span>
                <span>{event.player}</span>
            </div>
        );
    }

    return (
        <div className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm">
            <div className="text-red-500">Raus: {event.outPlayer}</div>
            <div className="text-green-600">Rein: {event.inPlayer}</div>
        </div>
    );
}
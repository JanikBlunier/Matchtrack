"use client";

import MatchTimeline from "./MatchTimeline";
import { useMatchEvents } from "./events/MatchEventsContext";

export default function TimelineSection() {
    const { events } = useMatchEvents();

    return (
        <main className="mx-auto w-full max-w-xl px-4 py-6">
            <MatchTimeline events={events} />
        </main>
    );
}
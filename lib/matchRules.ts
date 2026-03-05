import type { MatchEvent, EventType } from "@/components/match/events/MatchEventsContext";

export function playerHasRed(player: string | undefined, events: MatchEvent[]) {
    if (!player) return false;
    return events.some((e) => e.type === "red" && e.player === player);
}

export function playerHasTwoYellows(player: string | undefined, events: MatchEvent[]) {
    if (!player) return false;
    const yellows = events.filter((e) => e.type === "yellow" && e.player === player).length;
    return yellows >= 2;
}

export function playerIsSentOff(player: string | undefined, events: MatchEvent[]) {
    if (!player) return false;
    return playerHasRed(player, events) || playerHasTwoYellows(player, events);
}

export function isPlayerOnField(player: string | undefined, events: MatchEvent[]) {
    if (!player) return true;

    let onField = true;

    for (const e of events) {
        if (e.type !== "sub") continue;

        if (e.outPlayer === player) onField = false;
        if (e.inPlayer === player) onField = true;
    }

    return onField;
}

export function canAddPlayerEvent(
    eventType: EventType,
    player: string | undefined,
    events: MatchEvent[]
) {
    if (!player) return true;

    if (playerIsSentOff(player, events)) return false;

    if (eventType === "goal") {
        return isPlayerOnField(player, events);
    }

    return true;
}
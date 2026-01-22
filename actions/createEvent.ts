import { Types } from "mongoose";
import { connectMongoose } from "@/lib/mongoose";
import { MatchEvent, EventType } from "@/models/Events";

export type CreateEventInput = {
    matchId: string;
    teamId: string;
    playerId?: string;
    type: EventType;
    minute: number;
    second: number;
    notes?: string;
};

export async function createEvent(input: CreateEventInput) {
    await connectMongoose();

    const doc = await MatchEvent.create({
        matchId: new Types.ObjectId(input.matchId),
        teamId: new Types.ObjectId(input.teamId),
        playerId: input.playerId ? new Types.ObjectId(input.playerId) : undefined,
        type: input.type,
        minute: input.minute,
        second: input.second,
        notes: input.notes ?? "",
    });

    return doc._id.toString();
}

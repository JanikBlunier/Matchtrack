import { Types } from "mongoose";
import { connectMongoose } from "@/lib/mongoose";
import { Player } from "@/models/Player";

export type GetPlayersParams = {
    teamId?: string;
    isActive?: boolean;
};

export async function getPlayers(params: GetPlayersParams = {}) {
    await connectMongoose();

    const filter: Record<string, unknown> = {};

    if (params.teamId) filter.teamId = new Types.ObjectId(params.teamId);
    if (typeof params.isActive === "boolean") filter.isActive = params.isActive;

    const players = await Player.find(filter).sort({ number: 1 }).lean();
    return players;
}

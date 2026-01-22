import { Types } from "mongoose";
import { connectMongoose } from "@/lib/mongoose";
import { Player } from "@/models/Player";

export type GetPlayersParams = {
    teamId?: string;
    isActive?: boolean;
};

export type PlayerDTO = {
    id: string;
    teamId: string;
    firstName: string;
    lastName: string;
    number: number;
    position?: string;
    isActive: boolean;
};

export async function getPlayers(params: GetPlayersParams = {}): Promise<PlayerDTO[]> {
    await connectMongoose();

    const filter: Record<string, unknown> = {};
    if (params.teamId) filter.teamId = new Types.ObjectId(params.teamId);
    if (typeof params.isActive === "boolean") filter.isActive = params.isActive;

    const players = await Player.find(filter).sort({ number: 1 }).lean();

    return players.map((p: any) => ({
        id: p._id.toString(),
        teamId: p.teamId.toString(),
        firstName: p.firstName,
        lastName: p.lastName,
        number: p.number,
        position: p.position || "",
        isActive: !!p.isActive,
    }));
}

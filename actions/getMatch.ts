import { Types } from "mongoose";
import { connectMongoose } from "@/lib/mongoose";
import { Match } from "@/models/Match";

export async function getMatch(matchId: string) {
    await connectMongoose();

    const match = await Match.findById(new Types.ObjectId(matchId))
        .populate("homeTeamId")
        .populate("awayTeamId")
        .lean();

    return match;
}

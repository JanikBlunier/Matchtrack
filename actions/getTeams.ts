import { connectMongoose } from "@/lib/mongoose";
import { Team } from "@/models/Team";

export async function getTeams() {
    await connectMongoose();
    return Team.find().lean();
}

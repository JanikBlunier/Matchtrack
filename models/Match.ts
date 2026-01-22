import { Schema, model, models, Types } from "mongoose";

export type MatchStatus = "PLANNED" | "RUNNING" | "PAUSED" | "FINISHED";

export type MatchDoc = {
    homeTeamId: Types.ObjectId;
    awayTeamId: Types.ObjectId;
    status: MatchStatus;
    kickoffAt?: Date;
    venue?: string;
};

const matchSchema = new Schema<MatchDoc>(
    {
        homeTeamId: { type: Schema.Types.ObjectId, ref: "Team", required: true, index: true },
        awayTeamId: { type: Schema.Types.ObjectId, ref: "Team", required: true, index: true },
        status: { type: String, required: true, enum: ["PLANNED", "RUNNING", "PAUSED", "FINISHED"], default: "PLANNED" },
        kickoffAt: { type: Date },
        venue: { type: String, default: "" },
    },
    { timestamps: true }
);

matchSchema.index({ createdAt: -1 });

export const Match = models.Match || model<MatchDoc>("Match", matchSchema);

import { Schema, model, models, Types } from "mongoose";

export type EventType =
    | "START"
    | "HALFTIME"
    | "FULLTIME"
    | "GOAL"
    | "YELLOW"
    | "RED"
    | "SUB"
    | "FOUL"
    | "OFFSIDE"
    | "NOTE";

export type MatchEventDoc = {
    matchId: Types.ObjectId;
    teamId: Types.ObjectId;
    playerId?: Types.ObjectId;
    type: EventType;
    minute: number;
    second: number;
    isCancelled: boolean;
    notes?: string;
};

const matchEventSchema = new Schema<MatchEventDoc>(
    {
        matchId: { type: Schema.Types.ObjectId, ref: "Match", required: true, index: true },
        teamId: { type: Schema.Types.ObjectId, ref: "Team", required: true },
        playerId: { type: Schema.Types.ObjectId, ref: "Player" },

        type: {
            type: String,
            required: true,
            enum: ["START", "HALFTIME", "FULLTIME", "GOAL", "YELLOW", "RED", "SUB", "FOUL", "OFFSIDE", "NOTE"],
        },

        minute: { type: Number, required: true, min: 0, max: 130 },
        second: { type: Number, required: true, min: 0, max: 59 },

        isCancelled: { type: Boolean, default: false },
        notes: { type: String, default: "" },
    },
    { timestamps: true }
);

matchEventSchema.index({ matchId: 1, minute: 1, second: 1, createdAt: 1 });

export const MatchEvent = models.MatchEvent || model<MatchEventDoc>("MatchEvent", matchEventSchema);

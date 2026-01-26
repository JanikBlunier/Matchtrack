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

    period: 1 | 2;
    minute: number;
    second: number;

    extraMinute: number;
    extraSecond: number;

    sortKey: number;

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

        period: { type: Number, required: true, enum: [1, 2] },

        minute: { type: Number, required: true, min: 0, max: 130 },
        second: { type: Number, required: true, min: 0, max: 59 },

        extraMinute: { type: Number, required: true, min: 0, max: 30, default: 0 },
        extraSecond: { type: Number, required: true, min: 0, max: 59, default: 0 },

        sortKey: { type: Number, required: true, min: 0, index: true },

        isCancelled: { type: Boolean, default: false },
        notes: { type: String, default: "" },
    },
    { timestamps: true }
);

matchEventSchema.index({ matchId: 1, sortKey: 1, createdAt: 1 });

export const MatchEvent = models.MatchEvent || model<MatchEventDoc>("MatchEvent", matchEventSchema);

import { Schema, model, models, Types } from "mongoose";

export type PlayerDoc = {
    teamId: Types.ObjectId;
    firstName: string;
    lastName: string;
    number: number;
    position?: string;
    isActive: boolean;
};

const playerSchema = new Schema<PlayerDoc>(
    {
        teamId: { type: Schema.Types.ObjectId, ref: "Team", required: true, index: true },
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        number: { type: Number, required: true, min: 0, max: 99 },
        position: { type: String, default: "" },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

playerSchema.index({ teamId: 1, number: 1 });

export const Player = models.Player || model<PlayerDoc>("Player", playerSchema);

import { Schema, model, models } from "mongoose";

export type TeamDoc = {
    name: string;
    shortName: string;
    color?: string;
};

const teamSchema = new Schema<TeamDoc>(
    {
        name: { type: String, required: true, trim: true },
        shortName: { type: String, required: true, trim: true },
        color: { type: String, default: "#000000" },
    },
    { timestamps: true }
);

export const Team = models.Team || model<TeamDoc>("Team", teamSchema);

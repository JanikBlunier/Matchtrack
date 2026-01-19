import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) throw new Error("Missing MONGODB_URI in .env.local");

declare global {
    // eslint-disable-next-line no-var
    var _mongoosePromise: Promise<typeof mongoose> | undefined;
}

export async function connectMongoose() {
    if (global._mongoosePromise) return global._mongoosePromise;

    global._mongoosePromise = mongoose.connect(MONGODB_URI, {
        dbName: process.env.MONGODB_DB || "matchtrack",
    });

    return global._mongoosePromise;
}

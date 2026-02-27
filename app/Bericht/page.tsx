"use client";

import { useState } from "react";

export default function BerichtPage() {
    const [bericht, setBericht] = useState("");

    return (
        <div className="min-h-screen bg-white p-4 pb-24">
            <div className="max-w-xl mx-auto">
                <h1 className="text-xl font-semibold mb-3">Spielbericht</h1>

                <div className="border border-neutral-200 rounded-xl p-4 bg-white">
                    <p className="text-sm text-neutral-600 mb-3">
                        Hier kann der offizielle Spielbericht eingetragen werden.
                    </p>

                    <textarea
                        value={bericht}
                        onChange={(e) => setBericht(e.target.value)}
                        placeholder="Bericht eingeben..."
                        className="w-full h-56 border border-neutral-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black/10"
                    />
                </div>
            </div>
        </div>
    );
}
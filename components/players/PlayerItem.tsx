'use client'

import { Player } from "@/constants/players";

export default function PlayerItem({ player }: { player: Player }) {
    return (
        <button
            type="button"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition hover:bg-gray-50 active:scale-[0.99]"
        >
            <div className="flex items-center gap-4">
                <div
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-sm font-semibold text-white"
                >
                    {player.number}
                </div>

                <div>
                    <div className="font-semibold text-gray-900">
                        {player.name}
                    </div>
                    <div className="text-sm text-gray-500">
                        {player.position}
                    </div>
                </div>
            </div>
        </button>
    )
}

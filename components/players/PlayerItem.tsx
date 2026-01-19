'use client'

import { Player } from "@/constants/players";

export default function PlayerItem({ player }: { player: Player }) {
    return (
        <button
            type="button"
            className="w-full rounded-xl border border-gray-200 bg-white p-2 md:px-4 md:py-3 text-left shadow-sm transition hover:bg-gray-50 active:scale-[0.99] min-w-0"
        >
            <div className="flex items-center gap-2 md:gap-4 min-w-0">
                <div
                    className="flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs md:text-sm font-semibold text-white"
                >
                    {player.number}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 truncate text-sm md:text-base">
                        {player.name}
                    </div>
                    <div className="text-xs md:text-sm text-gray-500 truncate">
                        {player.position}
                    </div>
                </div>
            </div>
        </button>
    )
}

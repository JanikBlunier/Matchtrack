'use client'

export type PlayerDTO = {
    id: string
    teamId: string
    firstName: string
    lastName: string
    number: number
    position?: string
    isActive: boolean
}

type Props = {
    player: PlayerDTO
    onSelect: (player: PlayerDTO) => void
    disabled?: boolean
}

export default function PlayerItem({ player, onSelect, disabled = false }: Props) {
    const fullName = `${player.firstName} ${player.lastName}`

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={() => {
                if (disabled) return
                onSelect(player)
            }}
            className={[
                "w-full rounded-xl border p-2 md:px-4 md:py-3 text-left shadow-sm transition min-w-0",
                disabled
                    ? "border-gray-200 bg-gray-50 opacity-40 cursor-not-allowed"
                    : "border-gray-200 bg-white hover:bg-gray-50 active:scale-[0.99]",
            ].join(" ")}
        >
            <div className="flex items-center gap-2 md:gap-4 min-w-0">
                <div
                    className={[
                        "flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full text-xs md:text-sm font-semibold",
                        disabled ? "bg-gray-400 text-white" : "bg-gray-900 text-white",
                    ].join(" ")}
                >
                    {player.number}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 truncate text-sm md:text-base">
                        {fullName}
                    </div>
                    <div className="text-xs md:text-sm text-gray-500 truncate">
                        {player.position || "—"}
                    </div>
                </div>
            </div>
        </button>
    )
}
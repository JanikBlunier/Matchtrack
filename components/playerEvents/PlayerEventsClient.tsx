'use client'

import { useMemo, useState } from "react"
import PlayerItem, { PlayerDTO } from "@/components/players/PlayerItem"

type EventType = "GOAL" | "YELLOW" | "RED" | "SUB"

export default function PlayerEventsClient({
                                               homePlayers,
                                               awayPlayers,
                                           }: {
    homePlayers: PlayerDTO[]
    awayPlayers: PlayerDTO[]
}) {
    const [selectedPlayer, setSelectedPlayer] = useState<PlayerDTO | null>(null)

    const playerName = useMemo(() => {
        if (!selectedPlayer) return ""
        return `${selectedPlayer.firstName} ${selectedPlayer.lastName}`
    }, [selectedPlayer])

    function reset() {
        setSelectedPlayer(null)
    }

    function handleEvent(type: EventType) {
        // TODO später: API Call (playerId, type, minute)
        console.log("EVENT:", type, selectedPlayer)

        reset()
    }

    return (
        <div className="px-2 md:px-4 py-6">
            {/* SPIELERLISTE */}
            {!selectedPlayer && (
                <div className="grid grid-cols-2 gap-4 md:gap-8">
                    <div>
                        <h2 className="text-lg md:text-xl font-bold mb-4 px-2">Home</h2>
                        <div className="flex flex-col gap-3">
                            {homePlayers.map((p) => (
                                <PlayerItem
                                    key={p.id}
                                    player={p}
                                    onSelect={setSelectedPlayer}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg md:text-xl font-bold mb-4 px-2 text-right">
                            Away
                        </h2>
                        <div className="flex flex-col gap-3">
                            {awayPlayers.map((p) => (
                                <PlayerItem
                                    key={p.id}
                                    player={p}
                                    onSelect={setSelectedPlayer}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ACTION SHEET */}
            {selectedPlayer && (
                <div className="max-w-sm mx-auto rounded-2xl bg-white shadow-xl ring-1 ring-black/5 overflow-hidden">
                    <div className="flex items-center gap-3 px-4 py-3 border-b">
                        <div className="h-10 w-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold">
                            {selectedPlayer.number}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="font-semibold truncate">{playerName}</div>
                            <div className="text-sm text-gray-500">Aktion auswählen</div>
                        </div>

                        <button onClick={reset} className="text-xl text-gray-500">×</button>
                    </div>

                    <div className="p-4 grid grid-cols-2 gap-3">
                        <Action label="Tor" icon="⚽" tone="green" onClick={() => handleEvent("GOAL")} />
                        <Action label="Gelbe Karte" icon="🟨" tone="yellow" onClick={() => handleEvent("YELLOW")} />
                        <Action label="Rote Karte" icon="🟥" tone="red" onClick={() => handleEvent("RED")} />
                        <Action label="Auswechslung" icon="🔁" tone="blue" onClick={() => handleEvent("SUB")} />
                    </div>

                    <button
                        onClick={reset}
                        className="w-full py-3 bg-gray-100 hover:bg-gray-200 font-medium"
                    >
                        Abbrechen
                    </button>
                </div>
            )}
        </div>
    )
}

function Action({
                    label,
                    icon,
                    tone,
                    onClick,
                }: {
    label: string
    icon: string
    tone: "green" | "yellow" | "red" | "blue"
    onClick: () => void
}) {
    const map = {
        green: "bg-green-50 ring-green-200",
        yellow: "bg-yellow-50 ring-yellow-200",
        red: "bg-red-50 ring-red-200",
        blue: "bg-blue-50 ring-blue-200",
    }

    return (
        <button
            onClick={onClick}
            className={`h-24 rounded-xl ring-1 flex flex-col items-center justify-center gap-2 ${map[tone]}`}
        >
            <div className="text-2xl">{icon}</div>
            <div className="text-sm font-medium">{label}</div>
        </button>
    )
}

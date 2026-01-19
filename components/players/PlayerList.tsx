import PlayerItem from "@/components/players/PlayerItem";
import { DUMMY_PLAYERS } from "@/constants/dummyPlayers";

export default function PlayerList() {
    const homePlayers = DUMMY_PLAYERS.filter(player => player.team === 'home');
    const awayPlayers = DUMMY_PLAYERS.filter(player => player.team === 'away');

    return (
        <div className="grid grid-cols-2 gap-4 md:gap-8 px-2 md:px-4 py-6">
            <div>
                <h2 className="text-lg md:text-xl font-bold mb-4 px-2">Home</h2>
                <div className="flex flex-col gap-3">
                    {homePlayers.map((player) => (
                        <PlayerItem key={player.id} player={player} />
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-lg md:text-xl font-bold mb-4 px-2 text-right">Away</h2>
                <div className="flex flex-col gap-3">
                    {awayPlayers.map((player) => (
                        <PlayerItem key={player.id} player={player} />
                    ))}
                </div>
            </div>
        </div>
    )
}
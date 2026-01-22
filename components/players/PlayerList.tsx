import PlayerItem from "@/components/players/PlayerItem";
import { getPlayers } from "@/actions/getPlayers";
import { getTeams } from "@/actions/getTeams";

export default async function PlayerList() {
    const teams: any[] = await getTeams();

    const homeTeam = teams.find((t) => t.shortName === "HOME");
    const awayTeam = teams.find((t) => t.shortName === "AWAY");

    const homeTeamId = homeTeam?._id ? homeTeam._id.toString() : null;
    const awayTeamId = awayTeam?._id ? awayTeam._id.toString() : null;

    const homePlayers = homeTeamId ? await getPlayers({ teamId: homeTeamId }) : [];
    const awayPlayers = awayTeamId ? await getPlayers({ teamId: awayTeamId }) : [];

    return (
        <div className="grid grid-cols-2 gap-4 md:gap-8 px-2 md:px-4 py-6">
            <div>
                <h2 className="text-lg md:text-xl font-bold mb-4 px-2">Home</h2>
                <div className="flex flex-col gap-3">
                    {homePlayers.length === 0 ? (
                        <p className="text-sm text-gray-500 px-2">
                            Keine Home-Spieler gefunden (check: Team shortName = "HOME").
                        </p>
                    ) : (
                        homePlayers.map((player) => (
                            <PlayerItem key={player.id} player={player} />
                        ))
                    )}
                </div>
            </div>

            <div>
                <h2 className="text-lg md:text-xl font-bold mb-4 px-2 text-right">Away</h2>
                <div className="flex flex-col gap-3">
                    {awayPlayers.length === 0 ? (
                        <p className="text-sm text-gray-500 px-2 text-right">
                            Keine Away-Spieler gefunden (check: Team shortName = "AWAY").
                        </p>
                    ) : (
                        awayPlayers.map((player) => (
                            <PlayerItem key={player.id} player={player} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

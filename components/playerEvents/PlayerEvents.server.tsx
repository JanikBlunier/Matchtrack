import PlayerEventsClient from "./PlayerEventsClient"
import { getPlayers } from "@/actions/getPlayers"
import { getTeams } from "@/actions/getTeams"

export default async function PlayerEventsServer() {
    const teams: any[] = await getTeams()

    const homeTeam = teams.find((t) => t.shortName === "HOME")
    const awayTeam = teams.find((t) => t.shortName === "AWAY")

    const homeTeamId = homeTeam?._id ? homeTeam._id.toString() : null
    const awayTeamId = awayTeam?._id ? awayTeam._id.toString() : null

    const homePlayers = homeTeamId ? await getPlayers({ teamId: homeTeamId }) : []
    const awayPlayers = awayTeamId ? await getPlayers({ teamId: awayTeamId }) : []

    return <PlayerEventsClient homePlayers={homePlayers} awayPlayers={awayPlayers} />
}

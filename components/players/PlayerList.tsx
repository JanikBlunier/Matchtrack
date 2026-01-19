import PlayerItem from "@/components/players/PlayerItem";
import { DUMMY_PLAYERS } from "@/constants/players";

export default function PlayerList() {
    return(
        <section
            className=" flex flex-col gap-3 px-4 py-2 "
        >
            {DUMMY_PLAYERS.map((player) => (
                <PlayerItem key={player.id} player={player} />
            ))}
        </section>
    )
}
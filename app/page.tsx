import SpielerlistePage from "@/app/Spielerliste/page";
import TimerPage from "@/app/Timer/page";
import MatchPage from "@/app/match/page";

export default function Home() {
  return (
    <>
        <div>
            <TimerPage/>
        </div>

        <div>
           <MatchPage/>
        </div>

        <div>
            <p>Spielverlauf</p>
        </div>

        <div>
            <SpielerlistePage/>
        </div>
    </>
  );
}

import SpielerlistePage from "@/app/Spielerliste/page";
import TimerPage from "@/app/Timer/page";
import MatchPage from "@/app/match/page";
import TimelinePage from "@/app/Timeline/page";

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
            <TimelinePage/>
        </div>

        <div>
            <SpielerlistePage/>
        </div>
    </>
  );
}

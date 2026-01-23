import SpielerlistePage from "@/app/Spielerliste/page";
import TimerPage from "@/app/Timer/page";

export default function Home() {
  return (
    <>
        <div>
            <TimerPage/>
        </div>

        <div>
            <p>Spielstand</p>
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

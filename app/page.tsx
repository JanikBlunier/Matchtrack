import SpielerlistePage from "@/app/Spielerliste/page";

export default function Home() {
  return (
    <>
        <h1>Home</h1>
        <div>
            <p>counter</p>
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

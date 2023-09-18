import Bets from "@/components/Bets";
import LastRaceResults from "@/components/LastRaceResults";
import NextRace from "@/components/NextRace";

export default function Home() {
  return (
    <>
      <NextRace />
      <Bets />
      <LastRaceResults />
    </>
  );
}

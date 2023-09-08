import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LastRaceResults from "@/components/LastRaceResults";
import NextRace from "@/components/NextRace";
import NextRaces from "@/components/NextRaces";
import DriverStandings from "@/components/Standings";

export default function Home() {
  return (
    <>
      <div className="bg-[url(/bg.jpg)] bg-fixed bg-center px-6">
        <Header />
        <Hero />
      </div>
      <NextRace />
      <LastRaceResults />
      <DriverStandings />
      <NextRaces />
    </>
  );
}

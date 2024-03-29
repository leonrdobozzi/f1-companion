"use client";
import { api } from "@/services/axios";
import { useState, useEffect } from "react";
import { ILastRaceResults, INextRace } from "@/@types";
import Loading from "../Loading";

export default function NextRaces() {
  const [nextRaces, setNextRaces] = useState<INextRace[]>([]);
  const [lastRaceResults, setLastRaceResults] = useState<ILastRaceResults>();
  const [isLoading, setIsLoading] = useState(true);

  async function getNextRaces() {
    const { data } = await api.get("/current.json");

    const actualDate = new Date();

    const nextRaceFilter = data.MRData.RaceTable.Races.filter(
      (item: INextRace) => {
        const itemDate = new Date(
          item.date.split("-")[0] +
            "-" +
            item.date.split("-")[1] +
            "-" +
            item.date.split("-")[2],
        );

        return actualDate <= itemDate;
      },
    );

    return nextRaceFilter;
  }

  async function getLastRaceResult() {
    const { data } = await api.get("/current/last/results.json");

    return data.MRData.RaceTable.Races[0];
  }

  useEffect(() => {
    async function loadRacesData() {
      const [nextRacesPromise, lastRaceResultsPromise] = await Promise.all([
        getNextRaces(),
        getLastRaceResult(),
      ]);
      setNextRaces(nextRacesPromise);
      setLastRaceResults(lastRaceResultsPromise);
      setIsLoading(false);
    }

    loadRacesData();
  }, []);

  return (
    <div className="relative p-6 flex flex-col-reverse items-center lg:items-start lg:flex-row justify-between  bg-[#1b1b1b]">
      {isLoading ? <Loading /> : null}

      <div className="max-w-[1280px] mx-auto w-full">
        <h2 className="text-4xl text-[#DA2535] mt-5 mb-2 font-bold">
          Próximas corridas
        </h2>
        {nextRaces.map((race: INextRace) => (
          <div
            className="border-l-[#DA2535] border-l-4 border-solid my-5 lg:my-10 pl-5"
            key={race.Circuit.circuitId}
          >
            <h3 className="text-xl lg:text-4xl text-white font-bold">
              {race.raceName}
            </h3>
            <p className="text-gray-500 text-xs mt-1 font-bold">
              {race.Circuit.Location.locality}
            </p>
            <p className="text-sm lg:text-base font-bold mt-1 text-[#DA2535]">
              {race.FirstPractice.date.split("-")[2] +
                "/" +
                race.FirstPractice.date.split("-")[1] +
                "/" +
                race.FirstPractice.date.split("-")[0]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

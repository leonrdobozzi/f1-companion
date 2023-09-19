"use client";

import { ILastRaceResults, ILastRaceResult } from "@/@types";
import { api } from "@/services/axios";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import Image from "next/image";

export default function LastRaceResults() {
  const [lastRaceResults, setLastRaceResults] = useState<ILastRaceResults>();
  const [isLoading, setIsLoading] = useState(true);

  async function getLastRaceResults() {
    const { data } = await api.get("/current/last/results.json");

    setLastRaceResults(data.MRData.RaceTable.Races[0]);
    setIsLoading(false);
  }

  useEffect(() => {
    getLastRaceResults();
  }, []);
  return (
    <div className="px-6 pt-6 pb-6 bg-[url(/bg-2.png)] bg-cover bg-no-repeat bg-center bg-fixed relative">
      {isLoading ? <Loading /> : null}

      <div className="bg-[#1b1b1b] bg-opacity-90  py-10 px-5 rounded-md max-w-6xl mx-auto">
        <p className="text-center text-4xl text-white pb-5 font-bold">
          Resultados do {lastRaceResults?.raceName}
        </p>
        {lastRaceResults?.Results.map((result: ILastRaceResult, index) => (
          <div key={result.Driver.code} className="py-3 flex gap-10">
            <p className="text-sm lg:text-4xl text-white font-bold w-10">
              {result.position}
            </p>
            <div className="w-full">
              <p className="text-base lg:text-3xl text-white font-bold flex-1">
                {result.Driver.givenName} {result.Driver.familyName}
              </p>
              <p className="text-gray-400 font-bold mt-2">
                <span className="text-[#DA2535] text-xl">
                  {result.Constructor.name}
                </span>
              </p>
              <p className="text-[#DA2535] font-bold text-base mt-1">
                Volta mais rápida:{" "}
                <span
                  className={`text-white inline-block ${
                    !result.FastestLap?.Time.time ? "animate-pulse" : ""
                  }`}
                >
                  {result.FastestLap?.Time.time
                    ? result.FastestLap?.Time.time
                    : "--:--:--"}
                </span>
              </p>
              <p className="text-white text-sm lg:text-base mt-3 font-bold">
                {Number(result.points) > 0 && "+" + result.points + " Pontos"}
              </p>
              <hr
                className={`mt-5 border-[#DA2535] w-full ${
                  lastRaceResults.Results.length === index + 1 ? "hidden" : ""
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

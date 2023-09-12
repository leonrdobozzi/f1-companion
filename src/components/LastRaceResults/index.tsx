"use client";

import { ILastRaceResults, ILastRaceResult } from "@/@types";
import { api } from "@/services/axios";
import { useEffect, useState } from "react";

export default function LastRaceResults() {
  const [lastRaceResults, setLastRaceResults] = useState<ILastRaceResults>();
  async function getLastRaceResults() {
    const { data } = await api.get("/current/last/results.json");

    setLastRaceResults(data.MRData.RaceTable.Races[0]);
  }

  useEffect(() => {
    getLastRaceResults();
  }, []);
  return (
    <div className="px-6 pt-6 pb-6 bg-[url(/bg-2.jpg)] bg-center bg-fixed ">
      <div className="bg-white p-5 rounded-md max-w-6xl mx-auto">
        <p className="text-center text-2xl pb-5 font-bold">
          Resultados do {lastRaceResults?.raceName}
        </p>
        {lastRaceResults?.Results.map((result: ILastRaceResult, index) => (
          <div key={result.Driver.code} className="py-3 ">
            <div className="flex justify-between items-center">
              <p className="text-sm lg:text-4xl text-[#DA2535] font-bold">
                {result.position}
              </p>
              <p className="text-base lg:text-2xl flex-1 text-center">
                {result.Driver.givenName} {result.Driver.familyName}
              </p>
              <p className="text-[#DA2535] text-sm lg:text-2xl font-bold">
                {Number(result.points) > 0 ? "+" + result.points : ""}
              </p>
            </div>
            <p className="text-gray-400 font-bold mt-3 text-xs lg:text-base">
              Equipe:{" "}
              <span className="text-[#DA2535]">{result.Constructor.name}</span>
            </p>
            <p className="text-gray-400 font-bold text-xs mt-1">
              Volta mais rápida:{" "}
              <span className="text-[#DA2535]">
                {result.FastestLap?.Time.time}
              </span>
            </p>
            <hr
              className={`mt-5 ${
                lastRaceResults.Results.length === index + 1 ? "hidden" : ""
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

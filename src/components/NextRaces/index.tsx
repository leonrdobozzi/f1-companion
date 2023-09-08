"use client";
import { api } from "@/services/axios";
import { useState, useEffect } from "react";

export default function NextRaces() {
  const [nextRaces, setNextRaces] = useState<any>();
  async function getNextRaces() {
    const { data } = await api.get("/current.json");

    const actualDate = new Date();

    const nextRaceFilter = data.MRData.RaceTable.Races.filter((item: any) => {
      const itemDate = new Date(
        item.date.split("-")[0] +
          "-" +
          item.date.split("-")[1] +
          "-" +
          item.date.split("-")[2],
      );

      return actualDate <= itemDate;
    });

    console.log(nextRaceFilter);

    setNextRaces(nextRaceFilter);
  }

  useEffect(() => {
    getNextRaces();
  }, []);

  return (
    <div className="p-6 bg-gray-50">
      {nextRaces?.map((race: any) => (
        <div
          className="border-l-[#DA2535] border-l-4 border-solid my-5 lg:my-10 pl-5"
          key={race?.Circuit?.circuitId}
        >
          <h3 className="text-black text-xl lg:text-4xl">{race?.raceName}</h3>
          <p className="text-gray-500 text-xs mt-1 font-bold">
            {race?.Circuit?.Location?.locality}
          </p>
          <p className="text-black text-sm lg:text-base  font-bold mt-1">
            {race?.FirstPractice.date.split("-")[2] +
              "/" +
              race?.FirstPractice.date.split("-")[1] +
              "/" +
              race?.FirstPractice.date.split("-")[0]}
          </p>
        </div>
      ))}
    </div>
  );
}

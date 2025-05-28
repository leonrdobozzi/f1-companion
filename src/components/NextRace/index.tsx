"use client";

import { api } from "@/services/axios";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { INextRace } from "@/@types";

export default function NextRace() {
  const [nextRace, setNextRace] = useState<INextRace>();
  const [isVisible, setVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  async function getCurrentRaces() {
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

        if (actualDate > itemDate) {
          setVisible(false);
        }

        return actualDate <= itemDate;
      },
    );

    setNextRace(nextRaceFilter[0]);
    setIsLoading(false);
  }

  useEffect(() => {
    getCurrentRaces();
  }, []);

  return (
    <div
      className="relative px-6 lg:px-10 pt-6 lg:pt-10 pb-6 lg:pb-10 bg-[#1B1B1B]"
      style={{ display: isVisible ? "block" : "none" }}
      id="nextRace"
    >
      <div className="max-w-[1280px] mx-auto">
        {isLoading ? <Loading /> : null}
        <p className="text-gray-300 text-sm lg:text-base font-bold">
          Próxima corrida:
        </p>
        <h2 className="text-4xl text-white lg:text-5xl font-bold mt-2">
          {nextRace?.raceName}
        </h2>
        <p className="text-gray-400 text-sm lg:mt-2 lg:text-base font-bold">
          {nextRace?.Circuit.Location.locality}
          {" - "}
          {nextRace?.Circuit.Location.country}
        </p>
        <p className="text-sm text-white lg:text-base font-bold mt-2">
          {nextRace?.date.split("-")[2] +
            "/" +
            nextRace?.date.split("-")[1] +
            "/" +
            nextRace?.date.split("-")[0]}
        </p>
        <hr className="mt-4 border-[#DA2535]" />
        <p className="text-gray-300 text-sm lg:text-base font-bold mt-4">
          Treino 1:
        </p>
        <p className="text-sm text-white lg:text-base font-bold mt-1">
          {nextRace?.FirstPractice.date.split("-")[2] +
            "/" +
            nextRace?.FirstPractice.date.split("-")[1] +
            "/" +
            nextRace?.FirstPractice.date.split("-")[0]}
        </p>
        <p className="text-gray-300 text-sm lg:text-base font-bold mt-4">
          Qualifying:
        </p>
        <p className="text-sm text-white lg:text-base font-bold mt-1">
          {nextRace?.Qualifying.date.split("-")[2] +
            "/" +
            nextRace?.Qualifying.date.split("-")[1] +
            "/" +
            nextRace?.Qualifying.date.split("-")[0]}
        </p>
        <hr className="mt-4 border-[#DA2535]" />
        <a
          href={nextRace?.url}
          className="text-[#d9d9d9] underline mt-4 block text-sm lg:text-base"
        >
          Saiba mais
        </a>
      </div>
    </div>
  );
}

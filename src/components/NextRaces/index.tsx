"use client";
import { api } from "@/services/axios";
import { useState, useEffect } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

export default function NextRaces() {
  const [nextRaces, setNextRaces] = useState<any>();
  async function getNextRaces() {
    const { data } = await api.get("/current.json");

    const actualDate = new Date();

    const month = String(actualDate.getMonth() + 1).padStart(2, "0"); // O mês é baseado em zero, então adicionamos 1 e formatamos para 2 dígitos
    const day = String(actualDate.getDate()).padStart(2, "0");

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

    setNextRaces(nextRaceFilter);
  }

  useEffect(() => {
    getNextRaces();
  }, []);

  return (
    <AwesomeSlider bullets={false} animation="cubeAnimation">
      {nextRaces?.map((race: any) => (
        <div key={race?.Circuit?.circuitId}>
          <h3 className="text-white text-2xl lg:text-6xl">{race?.raceName}</h3>
          <p className="text-white text-base lg:text-2xl text-center font-bold mt-6">
            {race?.FirstPractice.date.split("-")[2] +
              "/" +
              race?.FirstPractice.date.split("-")[1] +
              "/" +
              race?.FirstPractice.date.split("-")[0]}
          </p>
        </div>
      ))}
    </AwesomeSlider>
  );
}

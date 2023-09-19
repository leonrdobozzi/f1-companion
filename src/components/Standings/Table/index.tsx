"use client";

import { IDriverStandings } from "@/@types";
import Loading from "@/components/Loading";
import { api } from "@/services/axios";
import { useState, useEffect } from "react";

export default function StandingsTable() {
  const [driverStandings, setDriverStandings] = useState<IDriverStandings[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  async function getDriverStandings() {
    const { data } = await api.get("/current/driverStandings.json");

    setDriverStandings(
      data.MRData.StandingsTable.StandingsLists[0].DriverStandings,
    );
    setIsLoading(false);
  }

  useEffect(() => {
    getDriverStandings();
  }, []);
  return (
    <div className="relative">
      {isLoading ? (
        <Loading />
      ) : (
        <table className="border border-gray-200 border-solid w-full">
          <thead>
            <tr>
              <th className="p-1 lg:text-2xl">Posição</th>
              <th className="p-1 lg:text-2xl">Piloto</th>
              <th className="p-1 lg:text-2xl">Pontos</th>
            </tr>
          </thead>
          <tbody>
            {driverStandings.map((driver: IDriverStandings) => (
              <tr key={driver.Driver.code}>
                <td className="text-center lg:text-2xl font-bold border border-gray-200 border-solid p-1">
                  {driver.position}
                </td>
                <td className="text-center border lg:text-2xl border-gray-200 border-solid p-1">
                  <span className="text-xs lg:text-base text-[#DA2535] font-bold">
                    {driver.Driver.givenName}
                  </span>
                  <br />
                  {driver.Driver.familyName}
                </td>
                <td className="text-center border lg:text-2xl border-gray-200 border-solid p-1">
                  {driver.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

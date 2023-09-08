"use client";

import { api } from "@/services/axios";
import { useEffect, useState } from "react";

export default function DriverStandings() {
  const [driverStandings, setDriverStandings] = useState<any>();
  async function getDriverStandings() {
    const { data } = await api.get("/current/driverStandings.json");

    setDriverStandings(
      data.MRData.StandingsTable.StandingsLists[0].DriverStandings,
    );
  }

  useEffect(() => {
    getDriverStandings();
  }, []);
  return (
    <div
      className="px-6 lg:px-10 pt-6 lg:pt-10 pb-6 lg:pb-10 bg-center bg-fixed"
      id="standings"
    >
      <div className="bg-white p-5 rounded-md">
        <p className="text-center text-2xl pb-5 font-bold">Tabela atual</p>
        <table className="border border-gray-200 border-solid w-full">
          <tr>
            <th className="p-1 lg:text-2xl">Posição</th>
            <th className="p-1 lg:text-2xl">Piloto</th>
            <th className="p-1 lg:text-2xl">Pontos</th>
          </tr>
          {driverStandings?.map((driver: any) => (
            <tr key={driver?.Driver?.code}>
              <td className="text-center lg:text-2xl font-bold border border-gray-200 border-solid p-1">
                {driver?.position}
              </td>
              <td className="text-center border lg:text-2xl border-gray-200 border-solid p-1">
                <span className="text-xs lg:text-base text-[#DA2535] font-bold">
                  {driver?.Driver?.givenName}
                </span>
                <br />
                {driver?.Driver?.familyName}
              </td>
              <td className="text-center border lg:text-2xl border-gray-200 border-solid p-1">
                {driver?.points}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

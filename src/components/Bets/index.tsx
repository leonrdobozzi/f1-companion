"use client";

import { IDriver } from "@/@types";
import { api } from "@/services/axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import Loading from "../Loading";

export default function Bets() {
  const [drivers, setDrivers] = useState<IDriver[]>([]);
  const [findedDriver, setFindedDriver] = useState<IDriver[]>([]);
  const [finding, setFinding] = useState<Boolean>(false);
  const [driver, setDriver] = useState<IDriver>();
  const [isLoading, setIsLoading] = useState(true);

  async function getDrivers() {
    const { data } = await api.get("/current/drivers.json");
    setDrivers(data.MRData.DriverTable.Drivers);
    setIsLoading(false);
  }

  useEffect(() => {
    getDrivers();
  }, []);
  return (
    <>
      {isLoading ? <Loading /> : null}
      <div className="px-6 lg:px-10 pb-5">
        <h2 className="lg:text-5xl font-bold ">
          Apostas do campeão do Japanese Grand Prix
        </h2>
        <p className="text-[#DA2535] font-bold text-lg mt-1">
          Data da corrida: 24/09/2023
        </p>
        <div className="flex mt-10 items-start">
          <div className="flex-1 relative">
            <input
              className="bg-[#FBFBFB] h-12 w-full px-5 "
              placeholder="EX.: Max Verstappen"
              type="text"
              onFocus={({ currentTarget }) => {
                setFinding(true);
                if (currentTarget.value === "") {
                  setFindedDriver(drivers);
                }
              }}
              onBlur={() => {
                setTimeout(() => {
                  setFinding(false);
                }, 250);
              }}
              onInput={({ currentTarget }) => {
                setFinding(true);
                setFindedDriver(
                  drivers.filter((driver) => {
                    if (
                      driver.familyName.includes(
                        currentTarget.value.charAt(0).toUpperCase(),
                      ) ||
                      driver.givenName.includes(
                        currentTarget.value.replace(
                          currentTarget.value.charAt(0),
                          currentTarget.value.charAt(0).toUpperCase(),
                        ),
                      )
                    ) {
                      return driver;
                    }
                  }),
                );
              }}
            />
            <div
              className={`bg-[#e5e5e5] p-5 absolute top-full z-50 w-full ${
                finding ? "block" : "hidden"
              }`}
            >
              {findedDriver.map((driverMaped: IDriver) => {
                return (
                  <>
                    <p
                      onClick={() => {
                        console.log(driverMaped);
                        setDriver(driverMaped);
                        setFinding(false);
                      }}
                      key={driverMaped.permanentNumber}
                    >
                      {driverMaped.givenName} {driverMaped.familyName}
                    </p>
                    <hr />
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-10">
          <div>
            <Image
              src={`/${driver?.driverId ? driver?.driverId : "silhouette"}.png`}
              alt="Piloto atual para sua votação"
              width="400"
              height="300"
              className="w-[500px] h-[300px]"
            />
            <hr />
            <h3 className="text-4xl text-[#DA2535] font-bold text-center mt-5">
              {driver?.givenName} {driver?.familyName}
            </h3>
            {driver && (
              <>
                <p className="font-bold text-center text-base mt-2 leading-relaxed">
                  Esse é o piloto que você gostaria de votar?
                </p>
                <div className="mt-10 flex items-center justify-center gap-10">
                  <button className="px-2 py-3 font-bold rounded-md bg-[#FBFBFB]">
                    Não, procurar novamente
                  </button>
                  <button className="px-2 text-white py-3 font-bold rounded-md bg-[#DA2535]">
                    Sim, confirmar voto
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import { IDriver, INextRace } from "@/@types";
import { api, server } from "@/services/axios";
import Image from "next/image";
import { useState, useEffect } from "react";
import Loading from "../Loading";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function Bets() {
  const [drivers, setDrivers] = useState<IDriver[]>([]);
  const [findedDriver, setFindedDriver] = useState<IDriver[]>([]);
  const [finding, setFinding] = useState<Boolean>(false);
  const [driver, setDriver] = useState<IDriver>();
  const [nextRaceDetails, setNextRaceDetails] = useState<INextRace>();
  const [isLoading, setIsLoading] = useState(true);
  const [isVoted, setIsVoted] = useState(false);
  const { data: session } = useSession();

  async function handlerSubmit() {
    await server
      .post("/vote", {
        data: {
          pilotId: driver?.code,
          userEmail: session?.user?.email,
          race: nextRaceDetails?.Circuit.circuitId,
          raceDate: nextRaceDetails?.date,
        },
      })
      .then(() => {
        toast.success("Vote computed with success");
        localStorage.setItem("voted", session?.user?.email as string);
        setIsVoted(true);
      })
      .catch(
        (e: { message: string; response: { data: { message: string } } }) => {
          toast.error(e.response.data.message);
        },
      );
  }

  async function getDrivers() {
    const { data } = await api.get("/current/drivers.json");
    return data.MRData.DriverTable.Drivers;
  }

  async function getNextRaceDetails() {
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

    return nextRaceFilter[0];
  }

  useEffect(() => {
    async function loadItemsData() {
      const [getDriversPromise, getNextRaceDetailsPromise] = await Promise.all([
        getDrivers(),
        getNextRaceDetails(),
      ]);

      setDrivers(getDriversPromise);
      setDriver(getDriversPromise[1]);
      setNextRaceDetails(getNextRaceDetailsPromise);
      setIsLoading(false);
    }

    loadItemsData();
  }, []);

  useEffect(() => {
    localStorage.getItem("voted") === (session?.user?.email as string) &&
      setIsVoted(true);
  }, [session?.user?.email]);

  return (
    <div className={`relative ${!session && "hidden"}`}>
      {isLoading ? <Loading /> : null}
      <div
        className={`absolute top-0 w-full h-full bg-[#181818] z-50 pointer-events-none bg-opacity-90 backdrop-blur-lg flex items-center justify-center ${
          isVoted ? "block" : "hidden"
        }`}
      >
        <p className="text-5xl text-white font-bold animate-pulse">
          Obrigado por ter votado!
        </p>
      </div>
      <div className="px-6 lg:px-10 pb-5 bg-[#181818] pt-10">
        <h2 className="lg:text-5xl font-bold text-center text-white">
          Apostas do campeão do {nextRaceDetails?.raceName}
        </h2>
        <p className="text-[#DA2535] text-center font-bold text-lg mt-1">
          Data da corrida:{" "}
          {nextRaceDetails?.date.split("-")[2] +
            "/" +
            nextRaceDetails?.date.split("-")[1] +
            "/" +
            nextRaceDetails?.date.split("-")[0]}
        </p>
        <div className="flex mt-10 items-start">
          <div className="flex-1 relative">
            <input
              className="bg-[#292929] h-12 w-full px-5 rounded-sm placeholder:text-[#1b1b1b] placeholder:font-bold"
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
              className={`bg-[#292929] p-5 absolute top-full z-50 w-full h-96 overflow-y-auto ${
                finding ? "block" : "hidden"
              }`}
            >
              {findedDriver.map((driverMaped: IDriver) => {
                return (
                  <div
                    key={driverMaped.permanentNumber}
                    className="py-2 cursor-pointer"
                    onClick={() => {
                      setDriver(driverMaped);
                      setFinding(false);
                    }}
                  >
                    <div className="flex gap-5">
                      <Image
                        width={70}
                        height={100}
                        className="w-12 h-14"
                        src={`/${driverMaped?.driverId}.png`}
                        alt=""
                      />
                      <div>
                        <p className="text-white text-xl">
                          {driverMaped.givenName} {driverMaped.familyName}
                        </p>
                        <p className="text-[#da2535] font-bold">
                          {driverMaped.code}
                        </p>
                      </div>
                    </div>
                    <hr className="border-[#da2535]" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-10">
          <div>
            <Image
              src={`/${driver?.driverId && driver?.driverId}.png`}
              alt="Piloto atual para sua votação"
              width="300"
              height="250"
              className="w-[300px] h-[250px] mx-auto block"
            />
            <hr />
            <h3 className="text-4xl text-white font-bold text-center mt-5">
              {driver?.givenName} {driver?.familyName}
            </h3>
            <p className="text-center text-[#DA2535] font-extrabold text-2xl">
              {driver?.code}
            </p>
            {driver && (
              <>
                <p className="font-bold text-center text-white text-base mt-2 leading-relaxed">
                  Esse é o piloto que você gostaria de votar?
                </p>
                <div className="mt-10 flex items-center justify-center gap-10">
                  <button
                    onClick={() => setFinding(true)}
                    className="px-2 py-3 font-bold rounded-md bg-[#FBFBFB]"
                  >
                    Não, procurar novamente
                  </button>
                  <button
                    onClick={() => handlerSubmit()}
                    className="px-2 text-white py-3 font-bold rounded-md bg-[#DA2535]"
                  >
                    Sim, confirmar voto
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

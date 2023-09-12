import Image from "next/image";

interface IDriver {
  driverId?: string;
  driverName?: string;
  driverLastName?: string;
  driverBestLap?: string;
  driverLastGP?: string;
}

export default function Driver({
  driverId,
  driverName,
  driverLastName,
  driverBestLap,
  driverLastGP,
}: IDriver) {
  return (
    <div className="flex flex-col items-center mb-10 lg:mb-0">
      <h2 className="text-center text-4xl text-[#DA2535] mt-5 mb-2 font-bold">
        Vencedor da última corrida
      </h2>
      <h3 className="text-center text-xl text-gray-500  mb-10 font-bold">
        {driverLastGP}
      </h3>
      <Image
        src={`/${driverId}.webp`}
        width="300"
        height="200"
        alt={`${driverName} ${driverLastName}`}
      />
      <hr className="w-full" />
      <h4 className="text-center text-2xl text-[#DA2535] mt-5 font-bold">
        {`${driverName} ${driverLastName}`}
      </h4>
      <small className="block text-center text-sm text-gray-500 mt-2 font-bold">
        {driverBestLap}
      </small>
    </div>
  );
}

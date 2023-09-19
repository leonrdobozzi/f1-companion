import StandingsTable from "./Table";

export default function DriverStandings() {
  return (
    <div
      className="px-6 lg:px-10 pt-6 lg:pt-10 pb-6 lg:pb-10 bg-center bg-fixed relative bg-[#1B1B1B]"
      id="standings"
    >
      <div className="bg-[#181818] p-5 rounded-md">
        <p className="text-center text-4xl pb-20 font-bold text-white">
          Tabela atual
        </p>
        <StandingsTable />
      </div>
    </div>
  );
}

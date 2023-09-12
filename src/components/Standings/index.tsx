import StandingsTable from "./Table";

export default function DriverStandings() {
  return (
    <div
      className="px-6 lg:px-10 pt-6 lg:pt-10 pb-6 lg:pb-10 bg-center bg-fixed relative"
      id="standings"
    >
      <div className="bg-white p-5 rounded-md">
        <p className="text-center text-2xl pb-20 font-bold">Tabela atual</p>
        <StandingsTable />
      </div>
    </div>
  );
}

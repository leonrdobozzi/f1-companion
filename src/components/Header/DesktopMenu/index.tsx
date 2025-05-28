import { api } from "@/services/axios";
import LinkButton from "../LinkButton";
import UserButton from "../UserButton";
import { INextRace } from "@/@types";

export default async function DesktopMenu() {
  const { data } = await api.get("/current.json");
  const actualDate = new Date();

  return (
    <nav className="hidden lg:flex items-center gap-10">
      <LinkButton link="standings" text="Classificação" />
      {data.MRData.RaceTable.Races.filter((item: INextRace) => {
        const itemDate = new Date(
          item.date.split("-")[0] +
            "-" +
            item.date.split("-")[1] +
            "-" +
            item.date.split("-")[2],
        );

        if (actualDate <= itemDate) {
          return <LinkButton link="races" text="Próximas corridas" />;
        }
      })}
      <UserButton />
    </nav>
  );
}

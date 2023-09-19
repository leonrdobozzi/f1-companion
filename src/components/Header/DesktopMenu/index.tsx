import LinkButton from "../LinkButton";
import UserButton from "../UserButton";

export default function DesktopMenu() {
  return (
    <nav className="hidden lg:flex items-center gap-10">
      <LinkButton link="standings" text="Classificação" />
      <LinkButton link="races" text="Próximas corridas" />
      <UserButton />
    </nav>
  );
}

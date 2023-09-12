import Link from "next/link";
import Logo from "../../assets/f1.png";
import Image from "next/image";
import LinkButton from "./LinkButton";
import MobileMenu from "./MobileMenu";

export default function Header() {
  return (
    <header className="py-6 lg:py-10 flex justify-between items-center">
      <Link href="/">
        <Image width={60} height={40} src={Logo} alt="Logotipo da Fórmula 1" />
      </Link>
      <MobileMenu />
      <nav className="hidden lg:flex gap-10">
        <LinkButton link="standings" text="Classificação" />
        <LinkButton link="races" text="Próximas corridas" />
      </nav>
    </header>
  );
}

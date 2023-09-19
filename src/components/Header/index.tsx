import Link from "next/link";
import Logo from "../../assets/f1.png";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

export default function Header() {
  return (
    <header className="py-6 lg:py-10 flex justify-between items-center">
      <Link href="/">
        <Image width={60} height={40} src={Logo} alt="Logotipo da Fórmula 1" />
      </Link>
      <MobileMenu />
      <DesktopMenu />
    </header>
  );
}

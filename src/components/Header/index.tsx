import Link from "next/link";
// import Logo from "../../assets/logo.png";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

export default function Header() {
  return (
    <header className="py-3 w-full lg:py-6 sticky top-0 backdrop-blur-sm">
      <div className="max-w-[1280px] mx-auto w-full flex justify-between items-center relative">
        <Link href="/">
          <Image
            width={60}
            height={40}
            src={"/logo.png"}
            alt="Logotipo da Fórmula 1"
          />
        </Link>
        <MobileMenu />
        <DesktopMenu />
      </div>
    </header>
  );
}

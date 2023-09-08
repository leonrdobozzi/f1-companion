import Logo from "../../assets/f1.png";
import Image from "next/image";

export default function Header() {
  return (
    <header className="py-6 lg:py-10 flex justify-between items-center">
      <Image width={60} height={40} src={Logo} alt="Logotipo da Fórmula 1" />
      <button className="py-2 px-4 rounded-md text-white gap-2 bg-[#DA2535] flex justify-between items-center">
        Menu
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M21 10H7"
            stroke="#F9F9F9"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21 6H3"
            stroke="#F9F9F9"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21 14H3"
            stroke="#F9F9F9"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21 18H7"
            stroke="#F9F9F9"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </header>
  );
}

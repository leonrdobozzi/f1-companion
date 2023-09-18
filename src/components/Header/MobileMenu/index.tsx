"use client";

import { useState } from "react";
import LinkButton from "../LinkButton";

export default function MobileMenu() {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  return (
    <>
      <button
        onClick={() => setMenuIsOpen(!menuIsOpen)}
        className="py-2 px-4 rounded-md text-white gap-2 bg-[#DA2535] flex justify-between items-center lg:hidden"
      >
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
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 6H3"
            stroke="#F9F9F9"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 14H3"
            stroke="#F9F9F9"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 18H7"
            stroke="#F9F9F9"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <nav
        className={`lg:hidden fixed w-full h-full bg-gray-500 top-0 ${
          menuIsOpen ? "left-0" : "left-[150%]"
        } flex flex-col items-center justify-center gap-10 transition-all z-50`}
      >
        <div onClick={() => setMenuIsOpen(!menuIsOpen)}>
          <LinkButton link="standings" text="Classificação" />
        </div>
        <div onClick={() => setMenuIsOpen(!menuIsOpen)}>
          <LinkButton link="races" text="Próximas corridas" />
        </div>
        <button
          onClick={() => setMenuIsOpen(!menuIsOpen)}
          className="py-2 px-4 rounded-md text-white gap-2 bg-[#DA2535] flex justify-between items-center lg:hidden"
        >
          Fechar menu
        </button>
      </nav>
    </>
  );
}

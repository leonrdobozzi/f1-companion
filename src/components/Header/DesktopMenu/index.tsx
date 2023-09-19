"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import LinkButton from "../LinkButton";
import UserButton from "../UserButton";

export default function DesktopMenu() {
  const { data: session } = useSession();
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    if (session) {
      return setIsLogged(true);
    }
  }, [session]);
  return (
    <nav className="hidden lg:flex items-center gap-10">
      <LinkButton link="standings" text="Classificação" />
      <LinkButton link="races" text="Próximas corridas" />
      {!isLogged ? (
        <UserButton />
      ) : (
        <span
          className="text-[#DA2535] underline block"
          onClick={() => signOut()}
        >
          {" "}
          Sair{" "}
        </span>
      )}
    </nav>
  );
}

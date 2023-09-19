"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function UserButton() {
  const { data: session } = useSession();
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    if (session) {
      return setIsLogged(true);
    }
  }, [session]);
  return (
    <>
      {!isLogged ? (
        <Link
          href="/login"
          className="bg-[#DA2535] w-full lg:w-max text-white text-base p-3 rounded-md block text-center hover:brightness-150"
        >
          Fazer Login
        </Link>
      ) : (
        <button
          onClick={() => signOut()}
          className="bg-[#DA2535] w-full lg:w-max text-white text-base p-3 rounded-md block text-center hover:brightness-150"
        >
          Sair
        </button>
      )}
    </>
  );
}

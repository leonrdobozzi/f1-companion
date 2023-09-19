"use client";
import { useSession } from "next-auth/react";
export default function HeroTitle() {
  const { data: session } = useSession();
  return (
    <h1 className="text-white text-xl lg:text-4xl font-semibold mb-4 w-7/12">
      {session
        ? `Olá, ${session.user?.name}. Seja bem-vindo(a) ao seu universo automotivo!`
        : "Olá, faça login e aproveite o máximo do universo automotivo!"}
    </h1>
  );
}

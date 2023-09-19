"use client";
import { useSession } from "next-auth/react";
export default function HeroTitle() {
  const { data: session } = useSession();
  return (
    <h1 className="text-white text-4xl lg:text-6xl font-bold italic mb-4">
      {session ? `Olá, ${session.user?.name}. Seja bem-vindo(a)!` : "FÓRMULA 1"}
    </h1>
  );
}

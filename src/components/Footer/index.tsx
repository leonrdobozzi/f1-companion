import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center bg-[#181818] py-16">
      <Image src="/logo.png" alt="Logotipo" width={50} height={50} />
      <p className="text-white font-thin mt-10">
        Manual do piloto é um projeto e independente para estudos e portfólio, o
        projeto não visa lucros e não gera receita.
      </p>
    </footer>
  );
}

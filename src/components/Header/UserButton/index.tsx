import Link from "next/link";

export default function UserButton() {
  return (
    <Link
      href="/login"
      className="bg-[#DA2535] w-full lg:w-max text-white text-base p-3 rounded-md block text-center hover:brightness-150"
    >
      Fazer Login
    </Link>
  );
}

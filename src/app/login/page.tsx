import Link from "next/link";

export default function Login() {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-400 bg-opacity-95 flex items-center justify-center">
      <form className="flex flex-col items-center gap-10">
        <input
          className="w-96 h-10 px-5 rounded-md text-gray-800 placeholder:text-gray-800 outline-none"
          placeholder="E-Mail"
          type="email"
          name=""
          id=""
        />
        <input
          className="w-96 h-10 px-5 rounded-md text-gray-800 placeholder:text-gray-800 outline-none"
          type="password"
          placeholder="Senha"
          name=""
          id=""
        />
        <button className="mt-2 bg-[#DA2535] w-full text-white text-base p-3 rounded-md block text-center hover:brightness-150">
          Login
        </button>
        <Link className="text-white" href="/">
          Ou então,
          <p className="inline text-[#DA2535] underline underline-offset-4 font-bold">
            {" "}
            cadastre-se
          </p>
        </Link>
      </form>
    </div>
  );
}

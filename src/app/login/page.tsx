"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.error) {
        throw new Error("Invalid credentials");
      }

      if (callback?.ok && !callback?.error) {
        router.push("/");
      }
    });
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-400 bg-opacity-95 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-10"
      >
        <input
          className="w-96 h-10 px-5 rounded-md text-gray-800 placeholder:text-gray-800 outline-none"
          placeholder="Email"
          {...register("email")}
        />
        <input
          className="w-96 h-10 px-5 rounded-md text-gray-800 placeholder:text-gray-800 outline-none"
          placeholder="Senha"
          {...register("password")}
        />
        <input
          placeholder="Login"
          type="submit"
          className="mt-2 bg-[#DA2535] w-full text-white text-base p-3 rounded-md block text-center hover:brightness-150"
        />

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

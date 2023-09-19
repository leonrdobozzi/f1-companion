import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password, name } = body.data;

    if (!email || !name || !password) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const hashedPassowrd = bcrypt.hashSync(password, 12);

    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userExists)
      return NextResponse.json(
        { message: "User already exists!" },
        { status: 400 },
      );

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassowrd,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { pilotId, userEmail, race, raceDate } = body.data;
    if (!pilotId || !userEmail || !race || !raceDate) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        email: userEmail,
      },
    });

    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    const vote = await prisma.vote.findFirst({
      where: {
        raceDate,
        userId: user.id,
      },
    });

    if (vote)
      return NextResponse.json(
        { message: "Vote already computed!" },
        { status: 401 },
      );

    const createdVote = await prisma.vote.create({
      data: {
        pilotId,
        race,
        raceDate,
        userId: user.id,
      },
    });

    return NextResponse.json(
      {
        message: "Vote computed with success!",
        createdVote,
      },
      { status: 201 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

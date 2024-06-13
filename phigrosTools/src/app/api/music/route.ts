import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const musics = await prisma.music.findMany({
    include: {
      difficulty: true,
    },
  });
  return NextResponse.json(musics);
}

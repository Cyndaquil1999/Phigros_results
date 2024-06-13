import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const users = await prisma.music.findMany({
    include: {
      UserMusicScores: true,
    },
  });
}

// TODO: NextAuthを用いたGoogleアカウントでの認証をここに実装する

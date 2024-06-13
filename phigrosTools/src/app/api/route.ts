import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const data = { message: 'Hello, Next.js API!' };
  return NextResponse.json(data);
}

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log(`Request: ${request.method} ${request.url}`);
  return NextResponse.json({ message: 'Welcome to the API' });
}

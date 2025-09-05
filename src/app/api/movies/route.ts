import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Log request metadata
  console.log(`Request: ${request.method} ${request.url} - Path: ${new URL(request.url).pathname}`);

  return NextResponse.json({ message: 'Welcome to the Movies API' });
}

import { auth0 } from './src/lib/auth0';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  return auth0.handleMiddleware(request, NextResponse);
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};

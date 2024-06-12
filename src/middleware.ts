import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = ['/', '/personal-info', '/plans', '/add-ons', '/finishing-up'].includes(path);

  const token = request.cookies.get('token')?.value || '';
  console.log('Path: ', path);
  console.log('Token: ', token);

  // if the user is on a public path or is trying to navigate to a public path and has a valid token they will be redirected to thankyou page
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/thankyou', request.nextUrl))
  }

  // if the user is not on a public path or is trying to navigate to a thankyou page and does not have a valid token they will be redirected to personal-info page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/personal-info', request.nextUrl))
  }
}

export const config = {
  matcher: [
    '/',
    '/personal-info',
    '/plans',
    '/add-ons',
    '/finishing-up',
    '/thankyou',
  ]
}
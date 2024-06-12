import { NextRequest, NextResponse } from "next/server";

export function middleware(request:NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/personal-info' || path === '/plans' || path === '/add-ons' || path === '/finishing-up'

  const token = request.cookies.get('token')?.value || '';
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/thankyou', request.nextUrl))
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/personal-info', request.nextUrl))
  }
}

export const config = {
  matcher:[
    '/personal-info',
    '/plans',
    '/add-ons',
    '/finishing-up'
  ]
}
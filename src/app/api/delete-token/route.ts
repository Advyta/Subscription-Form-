import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request:NextRequest) {
  const response = NextResponse.json({ message: "Token deleted successfully" });
  response.cookies.set('token', '', {httpOnly: true, expires: new Date(0)})
  return response;
}

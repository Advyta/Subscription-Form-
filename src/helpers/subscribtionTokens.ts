import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const subscribtionToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get('token')?.value || '';
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken.email;
    
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const deleteToken = (response: NextResponse) => {
  try {
     response.cookies.set({
      name: 'token',
      value: '',
      expires: new Date(0), // Set the expiry date to the past to delete the cookie
      path: '/',
    });
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
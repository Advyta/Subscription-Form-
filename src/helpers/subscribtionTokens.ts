import { NextRequest } from "next/server";
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
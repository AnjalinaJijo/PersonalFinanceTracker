import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      userName: string;
      email: string;
      accessToken: string;
      refreshToken:string;
      expiresIn:number;
    }
  }
}

import {JWT} from "next-auth/jwt"

declare module "next-auth/jwt"{
interface JWT {
  user: {
    id: number;
    userName: string;
    email: string;
    accessToken: string;
    refreshToken:string;
    expiresIn:number;
  }
}
}
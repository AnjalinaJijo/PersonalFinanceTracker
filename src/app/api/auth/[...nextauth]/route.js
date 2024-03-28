import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { useDispatch } from "react-redux";
// import { useRouter } from "next/router";
//redux
// Import your store instance
import { makeStore } from "@/lib/store";
import { login } from "@/lib/features/auth/authSlice";
import { signOut } from "next-auth/react";

// import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";

async function refreshToken(user) {

  // console.log("user inside refresh", user);
  const res = await fetch("http://localhost:3500/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${user.refreshToken}`,
    },
  });
  // console.log("refreshed");

  // Check if the response status is 403
  if (res.status === 403) {
    console.log("Token refresh failed. Status: 403 Forbidden");
    // signOut("/login")
    return "Expired";
  }

  const response = await res.json();

  // console.log("refreshed values IMMPP", response);
  const { accessToken, refreshToken, ExpiresIn } = response;

  return {
    ...user,
    accessToken: accessToken,
    refreshToken: refreshToken,
    ExpiresIn: ExpiresIn,
  };
}

export const authOptions = {

  providers: [
    //1. Google Provider
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET
    // }),

    //2.CredentialsProvider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      //Name => Descriptive name for the provider
      //Credentials -> The credentials to sign-in with(here userName and pwd)
      //Authorize -> Callback to execute once user is to be authorized(after user types in name and pwd and clicks login)
      async authorize(credentials, req) {
        //credentials contain username and password we entered in login page
        if (!credentials.username || !credentials.password) {
          return null;
        }
        // console.log("inside authorize")
        const store = makeStore();
        // const dispatch = useDispatch(); // Get the dispatch function
        // console.log("inside authorize")

        // const { username, password } = credentials as any;
        //destructuring username and password from credentials object
        const { username, password } = credentials;
        // console.log("username and pwd",{username,password})

        // const res = await fetch("http://localhost:3500/login",{
        //     method:"POST",
        //     headers:{
        //         "Content-Type":"application/json"
        //     },
        //     body:JSON.stringify({
        //         username,
        //         password
        //     })
        // })

        try {
          // Dispatch an action using the store's dispatch function
          const result = await store.dispatch(login({ username, password }));
          // console.log("result in route",result)
          // Do something with the result, e.g., check if login was successful
          if (result) {
            // console.log('result.payload in authSlice',result.payload[0])
            // Return the user object if login was successful
            return result.payload[0];
          } else {
            // Return null or handle the error accordingly
            return null;
          }
        } catch (error) {
          // console.error("Error during login", error);
          // Handle the error accordingly
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
  },

  // jwt: {
  //   maxAge: 1 * 60, // 5 minutes : 300, temporary 1 minute
  // },
  session: {
    strategy: "jwt",
    //the client side jwt expires in maxAge secs of "Inactivity"
    maxAge: 30, // 60s *60 = 60 min ie 1 hr
    //60sec * 60min*24 hr = 24 hr = 1 day
  },
  debug: true,
  //callback works only on signin
  callbacks: {
    //jwt callback to get accessToken
    async jwt({ token, user }) {
      //jwt call back is called everytime the session is checked
      if (user) {
        token.user = user;
        // token.user.expiresIn = Date.now() + parseInt(user.expiresIn) * 1000;
        // console.log('Returning token in jwt:', token);
        return token;
      }

      // console.log('token.exp * 1000',token.exp * 1000)
      // console.log("Date.now()+10*1000", token.user.expiresIn);
      // console.log("Date now", Date.now());

      // if (Date.now() < token.user.expiresIn) {
      if (new Date().getTime() < token.user.ExpiresIn) {
        // Token has not expired yet, return it
        return token;
      } else {
        // Token has expired, try to refresh it
        // console.log("Token has Expired! Refreshing...");
        try {
          const refreshedUser = await refreshToken(token.user);
          // return await refreshToken(token.user);
          const refreshedToken = { ...token, user: refreshedUser };
          return refreshedToken;
        } catch (error) {
          // console.error("Error refreshing access token", error);
          // Handle the refresh token error, you may want to redirect the user to reauthenticate
          return { ...token, error: "RefreshAccessTokenError" };
        }
        // return token
      }
    },

    async session({ token, session }) {
      // const router = useRouter();
      //IMP : here user is the entire return value from jwt callback
      session.user = token.user;
      // console.log("session inside session", session);
      return session;
    },

    // secret:process.env.NEXTAUTH_SECRET,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

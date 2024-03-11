import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

//redux
import {loginAPI} from "@/lib/features/auth/authSlice"
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import { setCookie } from 'nookies';

// import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";



async function refreshToken(user) {

  console.log('token inside refresh',user)
  const res = await fetch("http://localhost:3500/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${user.refreshToken}`,
    },
  });
  // console.log("refreshed");


   // Check if the response status is 403
   if (res.status === 403) {
    console.log('Token refresh failed. Status: 403 Forbidden');
    return user;
  }
  
  const response = await res.json();

  console.log("refreshed values IMMPP",response)
  const { accessToken,refreshToken } = response;

  

  return {
    ...user,
    "accessToken":accessToken,
    "refreshToken":refreshToken,
    "expiresIn":Date.now()+60*1000
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
                    password: { label: "Password", type: "password" }
                  },

                  //Name => Descriptive name for the provider
                  //Credentials -> The credentials to sign-in with
                  //Authorize -> Callback to execute once user is to be authorized(after user types in name and pwd and clicks login)
                  async authorize(credentials, req) {

                    const dispatch = useAppDispatch(); // Access the Redux dispatch function

                    // const { username, password } = credentials as any;
                    const { username, password } = credentials;
                    // console.log({username,password})

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

                    const res = dispatch(loginAPI(username, password));

                    const user = await res.json()
                    console.log("hello")
                    console.log('user call response from REDUX',user)
                    console.log('hello')
                    // console.log('user[0]',user[0])
                    // console.log('hello')
              
                    if (res.ok && user.length>0 && user) {
                      // console.log("user inside authorize",user)
                      // Any object returned will be saved in `user` property of the JWT
                      // return {
                      //   name: user.userName,
                      //   id:user.id,
                      // };
                      return user[0]
                    } else {
                      // If you return null then an error will be displayed advising the user to check their details.
                      return null
              
                      // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                    }
                  }
                })
              ],
              pages: {
              signIn:'/login',
              signOut:'/',
              },

              // jwt: {
              //   maxAge: 1 * 60, // 5 minutes : 300, temporary 1 minute
              // },
              session: {
                strategy:"jwt",
                maxAge: 24 * 60 * 60, // 60s * 60min*24 hr = 24 hr = 1 day
              },
              debug:true,
              //callback works only on signin
              callbacks:{

                //jwt callback to get accessToken
                async jwt({ token,user}) {
                //   console.log('Received token:', token);
                //  console.log('Received user:', user);
                //  console.log('Received account:', account)

                if (user) {
                  token.user = user;
                  token.user.expiresIn=(Date.now()+(parseInt(user.expiresIn)*1000))
                  // console.log('Returning token in jwt:', token);           
                return token
                 }

                // console.log('token.exp * 1000',token.exp * 1000)
                console.log('Date.now()+60*1000',token.user.expiresIn)
                console.log('Date now',Date.now())
                    
                if (Date.now() < token.user.expiresIn){
                  // Token has not expired yet, return it
                    return token;
                }
                else {
              // Token has expired, try to refresh it
              try {
                const refreshedUser = await refreshToken(token.user);
                const refreshedToken ={...token,"user":refreshedUser}
                return refreshedToken;
              } catch (error) {
                console.error('Error refreshing access token', error);
                // Handle the refresh token error, you may want to redirect the user to reauthenticate
                return { ...token, error: 'RefreshAccessTokenError' };
              }
                // return token
              }
                },

                async session({ session, token }) {
                  // console.log('token inside session',token)
                  // session.user = token.user;
                  session.user = token.user;
                  // console.log('session inside session',session)
                  return session;
                },

                
              // secret:process.env.NEXTAUTH_SECRET,
              }
    }

const handler = 
NextAuth(authOptions);

export { handler as GET, handler as POST}



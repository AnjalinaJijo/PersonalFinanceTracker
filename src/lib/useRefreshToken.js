'use client'
import {useSession} from "next-auth/react"

export const useRefreshToken = ()=>{
    const {data:session} = useSession()

    const refreshToken = async ()=>{

    const res = await fetch("http://localhost:3500/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${session?.user.refreshToken}`,
    },
  });

  if(session){
    session.user.accessToken = res.data.accessToken
  }
        
    }
return refreshToken

}
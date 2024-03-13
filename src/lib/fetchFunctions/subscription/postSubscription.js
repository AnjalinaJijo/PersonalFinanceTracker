'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "../../../app/api/auth/[...nextauth]/route.js";

export default async function postSubscription(body){
    const session = await getServerSession(authOptions);

    const response = await fetch(`http://localhost:3500/subscriptions/${session?.user.id}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "authorization":`Bearer ${session?.user.accessToken}`
        },
        body:JSON.stringify(body), 
     
      })
    if(!response.ok){
        throw new Error('failed to fetch Goals')
    }

    console.log(response)
    return response.json()
}

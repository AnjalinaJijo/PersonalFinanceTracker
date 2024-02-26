'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route.js";

export default async function getExpense(){
    const session = await getServerSession(authOptions);

    const response = await fetch(`http://localhost:3500/income/${session?.user.id}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "authorization":`Bearer ${session?.user.accessToken}`
        }
    }
    )

    if(!response.ok){
        throw new Error('failed to fetch income')
    }

    console.log(response)
    return response.json()
}




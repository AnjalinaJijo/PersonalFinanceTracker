'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "../../../app/api/auth/[...nextauth]/route.js";


export default async function deleteGoal(GoalID){
    const session = await getServerSession(authOptions);
 
    const deleteResponse = await fetch(`http://localhost:3500/goal/${GoalID}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            "authorization":`Bearer ${session?.user.accessToken}`
        },
      })

    if(!deleteResponse.ok){
        throw new Error('failed to delete goals')
    }

    const res = await deleteResponse.json();
    return res
}

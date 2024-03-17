'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "../../../app/api/auth/[...nextauth]/route.js";


export default async function updateIncome(IncomeID,body){
    const session = await getServerSession(authOptions);
 
    const updateResponse = await fetch(`http://localhost:3500/income/${IncomeID}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "authorization":`Bearer ${session?.user.accessToken}`
        },
        body:JSON.stringify(body)
      })

    if(!updateResponse.ok){
        throw new Error('failed to update incomes')
    }

    const res = updateResponse.json();
    return res
}



'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "../../../app/api/auth/[...nextauth]/route.js";

export default async function postExpense(body){
    const session = await getServerSession(authOptions);

    const response = await fetch(`http://localhost:3500/expense/${session?.user?.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${session?.user.accessToken}`
      },
      body: JSON.stringify(body)
    });

    if(!response.ok){
        throw new Error('failed to post expenses')
    }

    const res = await response.json();
    return res
}

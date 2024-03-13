'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "../../../app/api/auth/[...nextauth]/route";
// import { DateFormatter } from "../../../components/DateFormatter.jsx";

export default async function updateSubscription(subId,body){
    const session = await getServerSession(authOptions);

    const response = await fetch(`http://localhost:3500/subscriptions/${subId}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "authorization":`Bearer ${session?.user.accessToken}`
        },
        body: JSON.stringify(body),
    }
    )

    if(!response.ok){
        throw new Error('failed to Update Goals')
    }

    // console.log(response)
    return response.json()
}

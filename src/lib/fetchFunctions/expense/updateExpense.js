'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "../../../app/api/auth/[...nextauth]/route.js";


export default async function updateExpense(ExpenseID,body){
    const session = await getServerSession(authOptions);
 
    const updateResponse = await fetch(`http://localhost:3500/expense/${ExpenseID}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "authorization":`Bearer ${session?.user.accessToken}`
        },
        body:JSON.stringify(body)
      })

    if(!updateResponse.ok){
        throw new Error('failed to update expenses')
    }

    const res = updateResponse.json();
    // console.log("Fetched Expense",expenseData)
    // Dispatch the result to the Redux store
    // store.dispatch(setExpenseArray(expenseData));
    return res
}



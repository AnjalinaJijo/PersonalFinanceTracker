'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "../../../app/api/auth/[...nextauth]/route.js";


export default async function deleteExpense(ExpenseID){
    const session = await getServerSession(authOptions);
 
    const deleteResponse = await fetch(`http://localhost:3500/expense/${ExpenseID}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            "authorization":`Bearer ${session?.user.accessToken}`
        },
      })

    if(!deleteResponse.ok){
        throw new Error('failed to delete expenses')
    }

    const res = await deleteResponse.json();
    // console.log("Fetched Expense",expenseData)
    // Dispatch the result to the Redux store
    // store.dispatch(setExpenseArray(expenseData));
    return res
}



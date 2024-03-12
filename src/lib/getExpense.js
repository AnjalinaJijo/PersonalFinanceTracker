'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route.js";

//redux store
import { makeStore } from "@/lib/store";
import { setExpenseArray } from "@/lib/features/expense/expenseSlice.js";

export default async function getExpense(){
    const session = await getServerSession(authOptions);
    const store = makeStore();
    // const dispatch = useAppDispatch()

    const response = await fetch(`http://localhost:3500/expense/${session?.user.id}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            "authorization":`Bearer ${session?.user.accessToken}`
        }
    }
    )

    if(!response.ok){
        throw new Error('failed to fetch expenses')
    }

    const expenseData = await response.json();
    // console.log("Fetched Expense",expenseData)
    // Dispatch the result to the Redux store
    // store.dispatch(setExpenseArray(expenseData));
    return expenseData
}



// Function to get static props with ISR
export async function getStaticProps() {
    try {
      // Fetch expense data using the getExpense function
      const expenseData = await getExpense();
  
      // Return the expense data as props
      return {
        props: {
          expenseData,
        },
        // Revalidate the page every 10 seconds (adjust as needed)
        revalidate: 10, // In seconds
      };
    } catch (error) {
      console.error('Error in getStaticProps:', error.message);
      return {
        props: {
          expenseData: [],
        },
        // Revalidate the page every 10 seconds (adjust as needed)
        revalidate: 10, // In seconds
      };
    }
  }
'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route.js";

export default async function getExpense(){
    const session = await getServerSession(authOptions);

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

    console.log(response)
    return response.json()
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
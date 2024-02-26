import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";

// type Props = {
//     params: {
//       id: string;
//     };
//   };

export default async function profilePage(props) {

    const session = await getServerSession(authOptions);

    const response = await fetch('http://localhost:3500/expense/' + `${props.params.id}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${session?.accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
  return (
    <div>
      <div>
        <h1></h1>
      </div>
    </div>
  )
}

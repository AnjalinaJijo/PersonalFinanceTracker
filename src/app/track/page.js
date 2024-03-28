`use client`
import React, {useEffect} from 'react'
import { signIn, signOut, useSession } from "next-auth/react";

const Track = () => {
    const { data: session } = useSession(); 

      //To signOut to login Page once signedOut
      useEffect(() => {
        // check if the error has occurred
        if (!session) {
            // Sign out here
            signOut("/login");
        }
      }, [session]);
  return (
    null
  )
}

export default Track

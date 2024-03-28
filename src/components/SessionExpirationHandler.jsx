'use client'
import { useEffect } from 'react';
// import { useRouter } from 'next/router';

import { signOut, useSession } from 'next-auth/react';

const SessionExpirationHandler = () => {
  const { data: session, status } = useSession();
  // const router = useRouter();

  useEffect(() => {
    console.log("status",status)
    // console.log("session",session)
    // console.log("session.user",session.user)

    const handleSessionExpiration = () => {

      // if (status === 'loading' || status === 'unauthenticated') {
      //   return;
      // }
       // If session is authenticated, sign out the user if session expires
      //  if (session && status === 'authenticated') {
      //   signOut();
      // }

      if (!session && status === 'unauthenticated') {
        // router.push('/login'); // Redirect to login page if session expires
        // if (router.pathname !== '/login') {
          signOut('/login');
        // }
        // signOut('/login')
      }
    };

    handleSessionExpiration();

    // return () => {
    //   // Cleanup code
      
    // };
  }, [session, status]);

  return null;
};

export default SessionExpirationHandler;

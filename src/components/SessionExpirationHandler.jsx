import { useEffect } from 'react';
// import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

const SessionExpirationHandler = () => {
  const { data: session, status } = useSession();
  // const router = useRouter();

  useEffect(() => {
    const handleSessionExpiration = () => {
      if (!session && status === 'authenticated') {
        // router.push('/login'); // Redirect to login page if session expires
        signOut('/login')
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

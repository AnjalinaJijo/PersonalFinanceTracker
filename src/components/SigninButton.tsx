"use client";
import Link from "next/link"

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const SigninButton = () => {
  const { data: session } = useSession();
  console.log('session user',session?.user);
  console.log('session',session);

  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
        <div className="bg-SunsetPurple p-3 rounded-lg">
        <p className="text-white">{session.user.userName}</p>
        <p className="text-white">{session.user.id}</p>
        </div>
        <button onClick={() => signOut({ callbackUrl: '/' })} className="bg-Mulberry hover:bg-CustomRed hover:scale-110 p-1 rounded ease-in-out duration-300">
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <>
    <div className='bg-LiserianPurple hover:bg-CustomRed hover:scale-110 p-1 rounded ease-in-out duration-300'>
    <Link href='/register'><button className="p-1">SignUp</button></Link>
    </div>
    <button onClick={() => signIn()} className="bg-LiserianPurple hover:bg-CustomRed hover:scale-110 p-1 rounded ease-in-out duration-300">
      Sign In
    </button>
    </>
  );
};

export default SigninButton;
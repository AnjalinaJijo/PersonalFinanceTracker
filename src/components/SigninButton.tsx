"use client";
import Link from "next/link"

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";
import { RxPerson } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";


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
    {/* <div className='bg-LiserianPurple hover:bg-CustomRed hover:scale-110 p-1 rounded ease-in-out duration-300'>
    <Link href='/register'><button className="p-1">SignUp</button></Link>
    </div> */}
    <div className="lg:flex hidden">
    <button onClick={() => signIn()} className="flex items-center justify-center gap-1 p-2 rounded-full border bg-LiserianPurple hover:bg-pearlyPurple hover:scale-90 ease-in-out duration-300">
      <RxPerson />
      <label className="font-medium whitespace-nowrap">Sign In</label>
    </button>
    </div>

    <div className="inline-block cursor-pointer lg:hidden" >
    <  GiHamburgerMenu />
    </div>
    </>
  );
};

export default SigninButton;
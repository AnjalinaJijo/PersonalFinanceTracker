
import Link from "next/link";
import SigninButton from "./SigninButton";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Navbar() {
  return (
    <div className="flex justify-between max-container padding-container relative z-30 p-5 font-serif">
      {/* back to HomePage button */}
      <Link href="/">
        <div className="flex lg:text-2xl md:text-xl font-bold">
          <h1>Rich With Money</h1>
        </div>
      </Link>

      <div className="flex items-center space-x-4 lg:text-xl md:text-lg ">
        <SigninButton />
        <div>
          <ThemeSwitcher />
        </div>

        {/* <div className='bg-LiserianPurple hover:bg-CustomRed hover:scale-110 p-1 rounded ease-in-out duration-300'>
                <Link href='/login'><button className="p-1">Login</button></Link>
            </div> */}
      </div>
    </div>
  );
}


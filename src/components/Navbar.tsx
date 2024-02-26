import Link from "next/link"
import SigninButton from "./SigninButton"

export default function Navbar() {
  return (
    <div className="flex justify-between p-10 font-serif">
        <div className="flex lg:text-2xl md:text-xl font-bold">
            <h1>Rich With Money</h1>
        </div>
        <div className="flex space-x-4 lg:text-xl md:text-lg">
            {/* <div className='bg-LiserianPurple hover:bg-CustomRed hover:scale-110 p-1 rounded ease-in-out duration-300'>
            <Link href='/register'><button className="p-1">SignUp</button></Link>
            </div> */}
            <SigninButton/>
            {/* <div className='bg-LiserianPurple hover:bg-CustomRed hover:scale-110 p-1 rounded ease-in-out duration-300'>
                <Link href='/login'><button className="p-1">Login</button></Link>
            </div> */}
        </div>
      
    </div>
  )
}


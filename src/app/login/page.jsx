'use client'
import {useState} from 'react'
import {signIn} from 'next-auth/react'

export default function Login() {

    const [user,setUser]= useState("")
    const [pwd,setPwd] = useState("")

    const handleSubmit = async(e)=>{
        e.preventDefault()
        console.log({user,pwd})

        const result = await signIn("credentials",{
            username:user,
            password:pwd,
            redirect:true,
            callbackUrl:"/dashboard",
        })

       

    }
  return (
    <div className='w-screen h-screen bg-slate-100'>
        <div className='bg-white w-full max-w-xs'>
        <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <div className='flex flex-wrap flex-col gap-2 justify-center items-center'>
            <h1 className='text-4xl font-bold'>LogIn!</h1>
            <div className='flex flex-col'>
            <label className='text-lg font-bold m-2'>User Name</label>
            <input type="text"
                autoComplete='off'
                onChange={(e)=>setUser(e.target.value)}
                value={user}
                required
                className='p-3 rounded-lg bg-Mulberry text-lg font-bold'/>
            </div>

            <div className='flex flex-col'>
            <label>Password</label>
            <input type="password"
                onChange={(e)=>setPwd(e.target.value)}
                autoComplete='off'
                value={pwd}
                required
                className='p-3 rounded-lg bg-Mulberry text-lg font-bold'/>
                </div>

            <button type='submit' className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded'>Log In</button>
            </div>
        </form>
        </div>
    </div>
  )
}

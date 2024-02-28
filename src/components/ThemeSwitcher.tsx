"use client";

import {useTheme} from "next-themes";
import { useEffect, useState } from "react";
import { BsMoonStarsFill } from "react-icons/bs";
import { MdWbSunny } from "react-icons/md";

export function ThemeSwitcher() {
  //Initiall theme is set to light
  const [darkMode, setDarkMode] = useState(false)

  useEffect(()=>{
    const theme = localStorage.getItem("theme")
    if(theme === "dark"){
      setDarkMode(true)
    }
  },[])

  useEffect(()=>{
    if(darkMode){
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme","dark")
    }
    else{
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme","light")
    }
  },[darkMode])





  return (
    <div className="relative flex items-center dark:bg-gray-900 bg-white cursor-pointer rounded-full  p-1"
    onClick={()=>setDarkMode(!darkMode)}
    >
      <div className="shadow-md transition-transform duration-300">
      {darkMode ? <MdWbSunny size={20} color="#FFD700" /> : <BsMoonStarsFill size={20} color="#000" />}
      </div>
    </div>
  )
};
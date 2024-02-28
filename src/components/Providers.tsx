'use client'
import React, {ReactNode} from 'react'
import {SessionProvider} from 'next-auth/react'
import {ThemeProvider} from 'next-themes'


import { NextUIProvider } from '@nextui-org/react'
// import { ThemeProvider as NextThemesProvider } from 'next-themes'

interface Props{
    children:ReactNode;
}
const Providers = ({children}:Props)=> {
  return (
  <ThemeProvider attribute='class'>
    <SessionProvider refetchInterval={10}>
       <NextUIProvider>
      {/* <NextThemesProvider
        attribute='class'
        defaultTheme='dark'
        themes={['light', 'dark', 'modern']}
      > */}
      {children}
      {/* </NextThemesProvider> */}
    </NextUIProvider>
    </SessionProvider>
  </ThemeProvider>
  )
}

export default Providers
"use client"
import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'next-themes'

interface Props{
  children:React.ReactNode
}

export default function Provider({children}:Props) {
   const [mounted, setMounted] = useState(false);
   useEffect(() => setMounted(true), [])

   if(!mounted ) return null
  return (
    <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system" >
      {children}
    </ThemeProvider>
  )
}

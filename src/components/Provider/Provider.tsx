"use client"
import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'next-themes'
import AdsContextProvider from '@/context/AdsContext';
import LanguageContextProvider from '@/context/LanguageContext';


export  function Provider({ children }: {children:React.ReactNode}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), [])

  if (!mounted) return null
  return (
    <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system" >
      <LanguageContextProvider>
        <AdsContextProvider>
          {children}
        </AdsContextProvider>
      </LanguageContextProvider>
    </ThemeProvider>
  )
}

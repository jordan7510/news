"use client"
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const TopHeader = dynamic(() => import("./TopHeader"), { ssr: false })
const MiddleHeader = dynamic(() => import("./MiddleHeader"), { ssr: false })
const BottomHeader = dynamic(() => import("./BottomHeader"), { ssr: false })

export default function Header() {
    const [scrollPosition, setScrollPosition] = useState(0)
    const [showMiddle, setShowMiddle] = useState(true)

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (currentScroll > 200 && currentScroll > scrollPosition) {
                setShowMiddle(false)
            } else if(currentScroll < 140 && currentScroll < scrollPosition){
                setShowMiddle(true)
                window.scrollTo({
                    top:0,
                    behavior:"smooth"
                })
            }
            if(currentScroll === 0){
                
            }
            setScrollPosition(currentScroll)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    },[scrollPosition])


    return (
        <div className='sticky top-0 z-50 bg-white dark:bg-black'>
            <TopHeader />
            <div className={`transition-all ease-in-out overflow-hidden duration-300 ${showMiddle ? "max-h-32 opacity-100" : "max-h-0 opacity-0"}`}>
                <MiddleHeader />
            </div>
            <BottomHeader />

        </div>
    )
}

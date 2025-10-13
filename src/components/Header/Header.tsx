"use client"
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const TopHeader = dynamic(() => import("./TopHeader"), { ssr: false })
const MiddleHeader = dynamic(() => import("./MiddleHeader"), { ssr: false })
const BottomHeader = dynamic(() => import("./BottomHeader"), { ssr: false })

export default function Header() {
    const [showMiddle, setShowMiddle] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (currentScroll > lastScrollY && currentScroll >= 170) {
                setShowMiddle(false)
                setLastScrollY(currentScroll)
            } else if (currentScroll < 30) {
                setShowMiddle(true)
                setLastScrollY(0)
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
            }
            setLastScrollY(currentScroll)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    })


    return (
        <div className='sticky top-0 z-50 bg-white dark:bg-black'>
            <TopHeader />
            <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${showMiddle ? "h-36 " : "h-0"}`}
            >
                <div
                    className={`transition-transform duration-500 ease-in-out ${showMiddle ? "translate-y-0" : "-translate-y-[400px]"
                        }`}
                >
                    <MiddleHeader />
                </div>
            </div>
            <BottomHeader />
        </div>
    )
}

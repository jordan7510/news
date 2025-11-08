"use client"
import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

const TopHeader = dynamic(() => import("./TopHeader"), { ssr: false })
const MiddleHeader = dynamic(() => import("./MiddleHeader"), { ssr: false })
const BottomHeader = dynamic(() => import("./BottomHeader"), { ssr: false })

export default function Header() {
    // const [scrollPosition, setScrollPosition] = useState(0)
    // const [showMiddle, setShowMiddle] = useState(true)

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const currentScroll = window.scrollY;
    //         if (currentScroll > scrollPosition && currentScroll > 50) {
    //             setShowMiddle(false)
    //         } else {
    //             setShowMiddle(true)
    //         }
    //         setScrollPosition(currentScroll)
    //     }
    //     window.addEventListener("scroll", handleScroll)
    //     return () => window.removeEventListener("scroll", handleScroll)

    // }, [scrollPosition])





    return (
        <div className='sticky top-0 z-50 bg-white dark:bg-black'>
            <TopHeader />
            {/* <div className={`${showMiddle ? "" : ""}`}>
                <div
                    className={`transition-transform duration-500 ease-in-out ${showMiddle ? "translate-y-0" : "-translate-y-[400px]"
                        }`}
                >
                </div>
            </div> */}
                    <MiddleHeader />

            <BottomHeader />
        </div>
    )
}

"use client"
import React from 'react'
import dynamic from 'next/dynamic'

const TopHeader = dynamic(()=>import("./TopHeader"),{ssr:false})
const MiddleHeader = dynamic(()=>import("./MiddleHeader"),{ssr:false})
const BottomHeader = dynamic(()=>import("./BottomHeader"),{ssr:false})



export default function Header() {
    return (
        <>
            <TopHeader />
            <MiddleHeader />
            <BottomHeader />
        </>
    )
}

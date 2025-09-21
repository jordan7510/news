"use client"
import React, { useEffect, useState } from 'react'
import "./style.css"
import { useBreakingNews } from '@/hooks/useBreakingNews'

export default function BreakingNews() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const breakingNews = useBreakingNews();
    const breakingNewsTiles = breakingNews.map((news) => news.title)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % breakingNewsTiles.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [breakingNewsTiles])

    return (
        <div className=' w-[100%] bg-brand rounded-md text-white  mt-2'>
            <div>
                <h2 className='p-1 font-bold text-lg font-'>Breaking News  <span className='font-normal'>|</span>
                </h2>
            </div>
            <div className='relative flex items-center w-[100%]  '>
                <p className='absolute slide-text'>{breakingNewsTiles[currentIndex]}</p>
            </div>
        </div>
    )
}

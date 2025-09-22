"use client"
import React, { useEffect, useState } from 'react'
import "./style.css"
import { useBreakingNews } from '@/hooks/useBreakingNews'

export default function BreakingNews() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const breakingNews = useBreakingNews();
    const breakingNewsTitles = breakingNews.map((news) => news.title)

    const handleAnimationIteration =()=>{
        setCurrentIndex((prevIndex) => (prevIndex + 1) % breakingNewsTitles.length)
    }

    return (
        <div className=' w-[100%] bg-brand rounded-md text-white  mt-2'>
            <div>
                <h2 className='p-1 font-bold text-lg font-'>Breaking News  <span className='font-normal'>|</span>
                </h2>
            </div>
            <div className='relative top-[-30px]'>
                <p onAnimationIteration={handleAnimationIteration} className='absolute slide-text'>{breakingNewsTitles[currentIndex]}</p>
            </div>
        </div>
    )
}

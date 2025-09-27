"use client"
import React, { useState } from 'react'
import "./style.css"
import { useBreakingNews } from '@/hooks/useBreakingNews'

export default function BreakingNews() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const breakingNews = useBreakingNews();
    const breakingNewsTitles = breakingNews.map((news) => news.title)

    const handleAnimationIteration = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % breakingNewsTitles.length)
    }

    return (
        <div className='bg-brand rounded-md text-white mt-2 overflow-hidden'>
            <div className='flex items-center whitespace-nowrap'>
                <h2 className='p-1 font-bold text-lg font-'>
                    Breaking News
                    <span className='font-normal'> | </span>
                </h2>
                <p
                    onAnimationIteration={handleAnimationIteration}
                    className='slide-text text-white dark:text-white'
                >
                    {breakingNewsTitles[currentIndex]}
                </p>
            </div>

        </div>
    )
}

"use client"
import { useLanguage } from '@/context/LanguageContext'
import React from 'react'

export default function LanguageSelector() {
    const { lang, updateLang } = useLanguage()

    const handleChangeOdia = (language: string) => {
        updateLang(language)
    }

    const handleChangeEnglish = (language: string) => {
        updateLang(language)
    }
    return (
        <div className='flex items-center gap-1 mx-auto'>
            <p
                className={lang === "Odia" ? `text-brand font-bold` : `cursor-pointer text-black dark:text-white`}
                onClick={() => handleChangeOdia("Odia")}>Odia</p>
            <span>|</span>
            <p
                className={lang === "English" ? `text-brand font-bold` : `cursor-pointer text-black dark:text-white`}
                onClick={() => handleChangeEnglish("English")}>English</p>
        </div>
    )
}

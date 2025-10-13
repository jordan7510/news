"use client"
import { BreakingNews } from "@/utils/Types";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";


export function useBreakingNews() {
    const {lang} = useLanguage()
    const [breakingNews, setBreakingNews] = useState<BreakingNews[]>([])


    useEffect(() => {
        async function getBreaking(): Promise<BreakingNews[]> {
            try {
                const res = await fetch(`/api/breaking-news?language=${lang}`)
                const data = await res.json()
                console.log("data",data?.data);
                setBreakingNews(data?.data || []) 
                return data
            } catch (error) {
                console.error("error getting brekaing news", error)
                return []
            }
        }
        getBreaking()
    }, [lang])
    console.log("breakingNews",breakingNews);
    return breakingNews
}


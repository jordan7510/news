"use client"
import { BreakingNews } from "@/components/DataTypes/Types";
import { useLanguage } from "@/context/LanguageContext";
import axios from "axios";
import { useEffect, useState } from "react";


export function useBreakingNews() {
    const {lang} = useLanguage()
    const [breakingNews, setBreakingNews] = useState<BreakingNews[]>([])

    useEffect(() => {
        async function getBreaking(): Promise<BreakingNews[]> {
            try {
                const res = await axios.get(`/api/breaking-news?language=${lang}`)
                const data: BreakingNews[] = await res.data
                setBreakingNews(data)
                return data
            } catch (error) {
                console.error("error getting brekaing news", error)
                return []
            }
        }
        getBreaking()
    }, [lang])

    return breakingNews
}


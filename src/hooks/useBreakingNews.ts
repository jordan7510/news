"use client"
import axios from "axios";
import { useEffect, useState } from "react";

interface BreakingNews {
    _id: string,
    language: string,
    title: string,
    authors: boolean,
    isActive: boolean,
    publishedTime: string,
    uid: string,
    __v: number,
}

export function useBreakingNews() {
    const [breakingNews, setBreakingNews] = useState<BreakingNews[]>([])

    useEffect(() => {
        async function getBreaking(): Promise<BreakingNews[]> {
            try {
                const res = await axios.get("/api/breaking-news")
                const data: BreakingNews[] = await res.data
                setBreakingNews(data)
                return data
            } catch (error) {
                console.error("error getting brekaing news", error)
                return []
            }
        }
        getBreaking()
    }, [])

    return breakingNews
}


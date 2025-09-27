"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AdsContextType } from "@/components/DataTypes/Types";

export const AdsContext = React.createContext<AdsContextType[] | undefined>(undefined)
const AdsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [ads, setAds] = useState<AdsContextType[]>([])

    async function getAds(): Promise<AdsContextType[]> {
            try {
                const res = await axios.get("/api/ads")
                const data: AdsContextType[] = res.data.data;
                return data
            } catch (error) {
                console.error("Error getting ads", error)
                throw error
            }
        }

    useEffect(() => {
        getAds().then((fetchedAds) => {
                setAds(fetchedAds)
            })

        const interval = setInterval(() => {
            getAds().then((fetchedAds) => {
                setAds(fetchedAds)
            })
        }, 5 * 60 * 1000)

        return ()=> clearInterval(interval)
    }, [])


    return (
        <AdsContext.Provider value={ads}>
            {children}
        </AdsContext.Provider>
    )
}

export default AdsContextProvider;
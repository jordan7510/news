import axios from "axios";
import React, { useEffect, useState } from "react";

interface AdsContextType {
    _id: string,
    brand_name: string,
    advetisement_name: string,
    ad_platform: string,
    ad_type: string,
    ad_link: string,
    daily_impression_limit: number,
    schedule: string,
    status: string,
    ad_image: string,
    language: string,
    publish: Date
}
export const AdsContext = React.createContext<AdsContextType | undefined>(undefined)
const AdsContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [ads, setAds] = useState<AdsContextType[]>([])



    useEffect(() => {
        async function getAds(): Promise<AdsContextType[]> {
            try {
                const res = await axios.get("https://argusnews.in/api/all-ads")
                const data: AdsContextType[] = await res.data.json();
                return data
            } catch (error) {
                console.error("Error getting ads", error)
                throw error
            }
        }
        const fetchedAds =  getAds()
        getAds(fetchedAds);
    }, [])


    return(
        <AdsContext.Provider value:ads>
            {children}
        </AdsContext.Provider>
    )
}
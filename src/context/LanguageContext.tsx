"use client"
import React, { useContext, useEffect, useState } from "react";

interface LanguageContextType{
    lang:string,
    updateLang:(language:string)=>void
}

export const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined)
const LanguageContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [lang, setLang] = useState("Odia")

    function updateLang(language:string) {
            setLang(language)
    }

    useEffect(() => {
        const storedLang = localStorage.getItem("language");
        if (storedLang) {
            setLang(storedLang)
        }
    },[])

    useEffect(()=>{
        localStorage.setItem("language",lang)
    },[lang])


    return (
        <LanguageContext.Provider value={{lang,updateLang}}>
            {children}
        </LanguageContext.Provider>
    )

}

export default LanguageContextProvider;

export function useLanguage(){
    const context = useContext(LanguageContext)
    if(!context){
        throw new Error("useLanguage must be within a LanguageContextProvider")
    }
    return context
}
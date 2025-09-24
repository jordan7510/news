"use client"
import Image from "next/image";
import lightLogo from "../../../public/assets/argus_logo.svg"
import darkLogo from "../../../public/assets/Argus_Logo _White.png"
import { useContext, useEffect, useMemo, useState } from "react";
import { AdsContext } from "@/context/AdsContext";
import { useTheme } from "next-themes";

export default function MiddleHeader() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {theme} =useTheme()

  const ads = useContext(AdsContext)

  const desktopAds = useMemo(()=>{
    return ads?.filter((ad) => ad.ad_platform == "desktop" && ad.ad_type == "Top") ?? []
  },[ads]);

  useEffect(()=>{
    const interval = setInterval(()=>{
      setCurrentIndex((prevIndex)=> {
        if(!desktopAds) return 0;
        return prevIndex === desktopAds.length -1 ? 0: prevIndex + 1
      })
    },5000)

    return ()=> clearInterval(interval)
  },[desktopAds])

  return (
    <div className="flex items-center justify-between py-2 border-b border-yellow-500">
      <div>
        <Image
          src={theme === "dark" ? darkLogo : lightLogo}
          alt="Logo" width={250} height={100}
        />
      </div>
      <div className="w-[1200px] h-[130px] flex items-center justify-center overflow-hidden">
        {
          desktopAds?.length > 0 && (
              <Image
              src={desktopAds[currentIndex].ad_image}
              key = {desktopAds[currentIndex]._id}
              alt={`${desktopAds[currentIndex].brand_name}`}
              style={{ objectFit: "contain" }}
              height={200}
              width={1200}
              priority
              />
          )
        }  
      </div>
    </div>
  )
}

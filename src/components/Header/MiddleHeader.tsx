"use client"
import Image from "next/image";
import lightLogo from "../../../public/assets/argus_logo.svg"
import darkLogo from "../../../public/assets/Argus_Logo _White.png"
import { useContext, useEffect, useMemo, useState } from "react";
import { AdsContext } from "@/context/AdsContext";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function MiddleHeader() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme } = useTheme()

  const ads = useContext(AdsContext)

  const desktopAds = useMemo(() => {
    return ads?.filter((ad) => ad.ad_platform == "desktop" && ad.ad_type == "Top") ?? []
  }, [ads]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (!desktopAds) return 0;
        return prevIndex === desktopAds.length - 1 ? 0 : prevIndex + 1
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [desktopAds])

  return (
    <div className="flex items-center justify-between py-2  ">
      <div>
        <Link href={"/"}>
          <Image
            src={theme === "dark" ? darkLogo : lightLogo}
            alt="Logo"
            width={250}
            height={100}
            priority
          />
        </Link>
      </div>
      <div className="relative w-full h-32 flex items-center justify-center overflow-hidden">
        {
          desktopAds?.length > 0 && (
            <Image
              className="object-contain"
              src={desktopAds[currentIndex].ad_image}
              key={desktopAds[currentIndex]._id}
              alt={`${desktopAds[currentIndex].brand_name}`}
              fill
              priority
            />
          )
        }
      </div>
    </div>
  )
}

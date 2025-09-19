"use client"
import Image from "next/image";
import Logo from "../../../public/assets/argus_logo.svg"
import { useContext } from "react";
import { AdsContext } from "@/context/AdsContext";

export default function MiddleHeader() {

  const ads = useContext(AdsContext)
  const desktopAds = ads?.filter((ad) => ad.ad_platform == "desktop" && ad.ad_type == "Top")
  console.log("desktopAds", desktopAds);



  return (
    <div className="flex items-center flex-row">
      <div>
        <Image
          src={Logo}
          alt="Logo" width={250} height={100}
        />
      </div>
      <div className="h-[32]">
        {
          desktopAds?.map((ad,i) => {
            return (
              <Image
              src={ad.ad_image}
              alt={`${ad.brand_name}`}
              layout="fill"
              objectFit="contain"
              key = {ad._id}
            />
            )
          })
        }
      </div>
    </div>
  )
}

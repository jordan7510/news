import { AdsContextType } from '@/utils/Types';
import Image from 'next/image'
import React from 'react'

export default function SideSquareAds({ad}:{ad:AdsContextType}) {

  return (
    <div className='w-full mx-auto px-1' >
        <Image
        src={ad.ad_image}
        alt={ad.ad_image}
        priority
        height={100}
        width={700}
        className='object-contain'
        />
    </div>
  )
}

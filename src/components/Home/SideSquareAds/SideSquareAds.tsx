import { AdsContextType } from '@/utils/Types';
import Image from 'next/image'
import React from 'react'

export default function SideSquareAds({ad}:{ad:AdsContextType}) {

  return (
    <div >
        <Image
        src={ad.ad_image}
        alt={ad.ad_image}
        priority
        height={100}
        width={360}
        className='object-contain'
        />
    </div>
  )
}

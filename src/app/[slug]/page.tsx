"use client"
import { Post } from '@/utils/Types';
import SideSquareAds from '@/components/Home/SideSquareAds/SideSquareAds';
import { AdsContext } from '@/context/AdsContext';
import { useLanguage } from '@/context/LanguageContext';
import moment from 'moment';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import Breadcrumb from '@/components/BreadCrumbs/BreadCrumbs';

export default function ArticleDetailPage() {
  const [post, setPost] = useState<Post[]>([]);
  const { lang } = useLanguage();
  const params = useParams()
  const slug = params?.slug as string
  const ads = useContext(AdsContext);

  const sideAds = useMemo(() => {
    return ads?.filter((ad) => ad.ad_platform == "desktop" && ad.ad_type == "Square" && ad.language == "Odia") ?? []
  }, [ads]);

  useEffect(() => {
    async function fetchPosts(): Promise<Post[]> {
      try {
        const res = await fetch(`/api/special-posts?language=${lang}`)
        const data = await res.json()
        const posts: Post[] = data?.data
        const found = posts.filter((p) => p.slug === slug)
        if (found) {
          setPost(found || null)
        }
        return posts
      } catch (error) {
        console.error("error fething post", error)
        return []
      }
    }
    fetchPosts()
  }, [lang,slug])

  console.log("posts", post);



  return (
    <section>
      <Breadcrumb/>
      <div className='grid grid-cols-12'>
        <div className='col-span-8'>
          <div className='space-y-3 px-2 py-4'>
            <div>
              <h2 className="font-bold text-lg"><span className="text-brand">{post[0]?.location} / </span>{post[0]?.title}</h2>
            </div>
            <div>
              <p className="text-sm  text-gray-600 font-medium">{post[0]?.authors} | {moment(post[0]?.publishedTime).fromNow()}</p>
            </div>
          </div>
          {post[0]?.thumbnail ? (
            <div className='relative h-[450px]'>
              <Image
                alt={post[0]?.title || "Article image"}
                src={post[0]?.thumbnail}
                fill
              />
            </div>
          ) : (
            <div className='relative h-[400px] bg-gray-200 flex items-center justify-center rounded-lg'>
              <p className='text-gray-500 text-sm'>Loading..</p>
            </div>
          )}

          <div className='p-4 space-y-3 rounded-md shadow-md'>
            <h2 className='text-brand font-bold text-lg'>Highlights</h2>
            <div className='border border-brand py-4 px-2 rounded-md' dangerouslySetInnerHTML={{ __html: post[0]?.highlights }}></div>
            <div dangerouslySetInnerHTML={{ __html: post[0]?.body }}></div>
          </div>
        </div>
        <div className='col-span-4 pt-4'>
          <p className='text-center text-lg font-medium py-2'>Sponsored !</p>
          <div className='flex flex-col items-center justify-center gap-6'>
            {
              sideAds.slice(0, 3).map((ad,i) => <SideSquareAds key={i} ad={ad} />)
            }
          </div>
        </div>
      </div>
    </section>
  )
}

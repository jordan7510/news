"use client"
import { Post } from '@/utils/Types';
import SideSquareAds from '@/components/Home/SideSquareAds/SideSquareAds';
import { AdsContext } from '@/context/AdsContext';
import moment from 'moment';
import Image from 'next/image';
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import Breadcrumb from '@/components/BreadCrumbs/BreadCrumbs';
import RelatedArticles from './components/RelatedArticles';

export default function ArticleDetailPage() {
  const [post, setPost] = useState<Post | null>(null);
  const params = useParams()
  const topic = params?.topic as string
  const article = params?.article as string
  const ads = useContext(AdsContext);

  const sideAds = useMemo(() => {
    return ads?.filter((ad) => ad.ad_platform == "desktop" && ad.ad_type == "Square" && ad.language == "Odia") ?? []
  }, [ads]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`/api/${topic}/${article}`)
        const data = await res.json()
        if (data?.data) {
          setPost(data.data)
        }
      } catch (error) {
        console.error("error fething post", error)
      }
    }
    fetchPosts()
  }, [topic, article])

  if (!post) {
    return <p className="text-center, py-2">Loading article</p>
  }


  return (
    <section>
      <Breadcrumb />
      <div className='grid grid-cols-12'>
        <div className='col-span-8'>
          <div className='space-y-3 px-2 py-4'>
            {

            }
            <div>
              <h2 className="font-bold text-lg"><span className="text-brand">{post.location} / </span>{post.title}</h2>
            </div>
            <div>
              <p className="text-sm  text-gray-600 font-medium">{post.authors} | {moment(post.publishedTime).fromNow()}</p>
            </div>
          </div>
          {post.thumbnail ? (
            <div className='relative h-[450px]'>
              <Image
                alt={post.title || "Article image"}
                src={post.thumbnail}
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
            <div className='border border-brand py-4 px-2 rounded-md' dangerouslySetInnerHTML={{ __html: post.highlights }}></div>
            <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
          </div>
        </div>
        <div className='col-span-4 pt-4'>
          <p className='text-center text-lg font-medium py-2'>Sponsored !</p>
          <div className='flex flex-col items-center justify-center gap-6'>
            {
              sideAds.slice(0, 3).map((ad, i) => <SideSquareAds key={i} ad={ad} />)
            }
          </div>
        </div>
      </div>

      <RelatedArticles/>
    </section>
  )
}

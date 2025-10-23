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

export default function CategoryPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { lang } = useLanguage();
  const params = useParams()
  const topic = params?.topic as string
  const ads = useContext(AdsContext);
  const limit = 20
  const offset = 0

  const sideAds = useMemo(() => {
    return ads?.filter((ad) => ad.ad_platform == "desktop" && ad.ad_type == "Square" && ad.language == "Odia") ?? []
  }, [ads]);

  useEffect(() => {
    async function fetchPosts(): Promise<Post[]> {
      try {
        const res = await fetch(`/api/${topic}/?language=${lang}&limit=${limit}&offset=${offset}`)
        const data = await res.json()
        const posts: Post[] = data?.data
        if (posts.length > 0) {
          setPosts(posts)
        }
        return posts
      } catch (error) {
        console.error("error fething post", error)
        return []
      }
    }
    fetchPosts()
  }, [lang, topic])

  console.log("posts", posts);



  return (
    <section>

      <div className='grid grid-cols-12'>
        <div className='col-span-8 flex'>
          <div className='w-1/3'>
            <p className='border-r-gray-500 dark:text-white text-white bg-gray-600 rounded-md text-center p-1'>
              Trending
            </p>
            {
              posts.map((post, i) => {
                return (
                  <div className='flex gap-4 rounded-md my-6 shadow-md p-2  hover:cursor-pointer' key={i}>
                    <div>
                      <Image
                        src={post.thumbnail}
                        height={80}
                        width={120}
                        priority
                        alt={post.thumbnail}
                        className='rounded-lg'
                      />
                    </div>

                    <div>
                      <h2 className="font-bold text-xs hover:underline hover:cursor-pointer"><span className="text-brand">{post.location} / </span>{post.title}</h2>
                      <p className="text-xs  text-gray-600 font-medium">{post?.authors} | {moment(post?.publishedTime).fromNow()}</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className='w-2/3'>
            <Breadcrumb />
            <div className='col-span-3'>

              {
                posts.map((post, i) => {
                  return (
                    <div className='flex gap-4 rounded-md my-6 shadow-md p-2  hover:cursor-pointer' key={i}>
                      <div>
                        <Image
                          src={post.thumbnail}
                          height={80}
                          width={120}
                          priority
                          alt={post.thumbnail}
                          className='rounded-lg'
                        />
                      </div>

                      <div>
                        <h2 className="font-bold text-xs hover:underline hover:cursor-pointer"><span className="text-brand">{post.location} / </span>{post.title}</h2>
                        <p className="text-xs  text-gray-600 font-medium">{post?.authors} | {moment(post?.publishedTime).fromNow()}</p>
                      </div>
                    </div>
                  )
                })
              }

            </div>
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
    </section>
  )
}

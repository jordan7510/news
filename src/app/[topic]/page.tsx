"use client"
import { Post } from '@/utils/Types';
import SideSquareAds from '@/components/Home/SideSquareAds/SideSquareAds';
import { AdsContext } from '@/context/AdsContext';
import { useLanguage } from '@/context/LanguageContext';
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import Breadcrumb from '@/components/BreadCrumbs/BreadCrumbs';
import CategoryBigCard from './components/CategoryBigCard';
import CategoryTrendingCard from './components/CategoryTrendingCard';
import CategorySmallCard from './components/CategorySmallCard';
import Link from 'next/link';

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
    async function fetchPosts() {
      try {
        const res = await fetch(`/api/${topic}/?language=${lang}&limit=${limit}&offset=${offset}`)
         console.log("res", res);
        const data = await res.json()
         console.log("data", data);
        // const resultPosts: Post[] = data?.data
        // console.log("resultPosts", resultPosts);
        if (data?.data?.length > 0) {
          setPosts(data.data)
        }else{
          setPosts([])
        }
      } catch (error) {
        console.error("error fething post", error)
         setPosts([])
      }
    }
    fetchPosts()
  }, [lang, topic])

         console.log("posts", posts);

  return (
    <section>

      <div className='grid grid-cols-12'>

        <div className='col-span-9 flex'>

          <div className='w-1/3 mx-1'>
            <p className='border-r-gray-500 dark:text-white text-white bg-gray-600 rounded-md text-center p-1'>
              Trending
            </p>
            {
              posts.slice(0, 10).map((post, i) => {
                return (
                  <Link key={i} href={`/${post.category[0].slug}/${post.slug}`}>
                    <CategoryTrendingCard
                      post={post}
                    />
                  </Link>
                )
              })
            }
          </div>

          <div className='w-2/3 mx-1'>
            <Breadcrumb />
            <div className='col-span-3'>
              {
                posts.slice(0, 1).map((post, i) => {
                  return (
                    <Link key={i} href={`/${post.category[0].slug}/${post.slug}`}>
                      <CategoryBigCard post={post} />
                    </Link>
                  )
                })
              }


              {
                posts.slice(0, 5).map((post, i) => {
                  return (
                    <Link key={i} href={`/${post.category[0].slug}/${post.slug}`}>
                      <CategorySmallCard
                        post={post}
                      />
                    </Link>
                  )
                })
              }
            </div>

          </div>

        </div>


        <div className='col-span-3 pt-4'>
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

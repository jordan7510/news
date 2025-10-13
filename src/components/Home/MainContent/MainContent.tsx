"use client"
import { Post } from "@/utils/Types"
import { useLanguage } from "@/context/LanguageContext"
import axios from "axios"
import { useContext, useEffect, useMemo, useState } from "react"
import NewsBigCard from "../NewsBigCard/NewsBigCard"
import NewsSmallCard from "../NewsSmallCard/NewsSmallCard"
import SideSquareAds from "../SideSquareAds/SideSquareAds"
import { AdsContext } from "@/context/AdsContext"
import LiveTV from "../LiveTV/LiveTV"
import Link from "next/link"

export default function MainContent() {
    const [posts, setPosts] = useState<Post[]>([]);
    const { lang } = useLanguage();
    const topPriporityPosts = posts.filter((post) => post.position < 3);
    const ads = useContext(AdsContext);
    const SideSquarepAds = useMemo(() => {
        return ads?.filter((ad) => ad.ad_platform == "desktop" && ad.ad_type == "Square" && ad.language == "Odia") ?? []
    }, [ads]);

    useEffect(() => {
        async function fetchPosts(): Promise<Post[]> {
            try {
                const res = await axios.get(`/api/special-posts?language=${lang}`)
                const data = res.data.posts
                if (data) {
                    setPosts(data)
                }
                return data
            } catch (error) {
                console.error("error fething post", error)
                return []
            }
        }
        fetchPosts()
    }, [lang])

    console.log("posts", posts);


    return (
        <section className='grid grid-cols-12 gap-x-1 border-b dark:border-white my-2'>
            <div className="col-span-4 border-r p-1 flex flex-col h-full">
                {
                    topPriporityPosts.map((post, i) => {
                        return (
                            <Link href={`/${post.slug}`} key={i}>
                                <NewsBigCard post={post} />
                            </Link>
                        )
                    })
                }
            </div>
            <div className="col-span-8 grid grid-cols-12 ">
                <div className="col-span-8 grid grid-cols-2 gap-x-2 border-r p-1">
                    {
                        posts.slice(0, 8).map((post) => {
                            return (
                                <Link href={`/${post.slug}`} key={post._id}>
                                    <NewsSmallCard post={post} />
                                </Link>
                            )
                        }
                        )
                    }
                </div>
                <div className="col-span-4 px-2 py-3  space-y-4 ">
                    <LiveTV />
                    {
                        SideSquarepAds.slice(0, 3).map((ad, i) => <SideSquareAds key={i} ad={ad} />)
                    }
                </div>
            </div>
        </section>
    )
}


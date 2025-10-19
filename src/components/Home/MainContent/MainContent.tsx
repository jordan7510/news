"use client"
import { Post } from "@/utils/Types"
import { useLanguage } from "@/context/LanguageContext"
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
                const res = await fetch(`/api/special-posts?language=${lang}`)
                console.log("posts response", res);
                const data = await res.json()

                // const data = res.data.posts
                console.log("posts data", data);

                if (data) {
                    setPosts(data.data)
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
        <section className='grid grid-cols-1 md:grid-cols-12 gap-x-1 border-b dark:border-white my-2'>
            <div className="col-span-4 border-r p-1 grid grid-rows-2">
                {
                    topPriporityPosts.slice(0, 2).map((post) => {
                        return (
                            <Link className="h-full" href={`/${post.slug}`} key={post.uid}>
                                <NewsBigCard post={post} />
                            </Link>
                        )
                    })
                }
            </div>
            <div className="md:col-span-8 grid grid-cols-12 ">
                <div className="col-span-12 md:col-span-8 grid grid-cols-2 md:grid-cols-2 gap-x-2 border-r p-1">
                    {
                        posts.slice(0, 8).map((post) => {
                            return (
                                <Link className="h-full" href={`/${post.slug}`} key={post.uid}>
                                    <NewsSmallCard post={post} />
                                </Link>
                            )
                        }
                        )
                    }
                </div>
                <div className=" col-span-12 md:col-span-4 px-2 py-3  space-y-4 ">
                    <div className="hidden md:block">
                        <LiveTV />
                    </div>
                    {
                        SideSquarepAds.slice(0, 3).map((ad, i) => <SideSquareAds key={i} ad={ad} />)
                    }
                </div>
            </div>
        </section>
    )
}


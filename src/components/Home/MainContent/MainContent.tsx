"use client"
import { Post } from "@/components/DataTypes/Types"
import { useLanguage } from "@/context/LanguageContext"
import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function MainContent() {
    const [posts, setPosts] = useState<Post[]>([])
    const { lang } = useLanguage();
    const topPriporityPosts = posts.filter((post) => post.position < 3)
    console.log("topPriporityPosts", topPriporityPosts)


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
    return (
        <section className='grid grid-col-12 border-b dark:border-white'>
            {/* Big card section */}
            {
                topPriporityPosts.map((post, i) => {
                    return (
                        <div
                        key={i}
                        className='col-span-4'>
                            <div>
                                <Image
                                    src={post?.thumbnail}
                                    alt=""
                                    width={400}
                                    height={100}
                                />
                            </div>
                            <div>
                                <h2>{post?.prefix}<span> / </span>{post?.title}</h2>
                            </div>
                            <div>
                                <p></p>
                            </div>
                        </div>
                    )
                })
            }
            <div className='col-span-8'>
                {/* Small card section */}
                <div className='w-2/3'>
                </div>
                {/* Right Section */}
                <div className='w-1/3'>
                </div>
            </div>
        </section>
    )
}

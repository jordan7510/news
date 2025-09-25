"use client"
import { Post } from "@/components/DataTypes/Types"
import { useLanguage } from "@/context/LanguageContext"
import axios from "axios"
import { useEffect, useState } from "react"
import NewsBigCard from "../NewsBigCard/NewsBigCard"
import NewsSmallCard from "../NewsSmallCard/NewsSmallCard"

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
        <section className='grid h-auto grid-cols-12 border-b dark:border-white my-2'>
            {/* Big card section */}
            <div className='col-span-4'>
                {
                    topPriporityPosts.map((post, i) => <NewsBigCard key={i} post={post} />)
                }
            </div>
            <div className='col-span-8'>
                <div className="w-2/3 grid grid-cols-2">
                    {
                        posts.map((post, i) => <NewsSmallCard key={i} post={post} />)
                    }
                </div>
                <div className="w-1/3">

                </div>
            </div>
        </section>
    )
}


// {/* Small card section */}
//                 <div className='w-2/3'>
//                     {
//                         topPriporityPosts.map((post, i) => {
//                             return (
//                                 <div key={i} className="w-full flex flex-col items-center justify-between">
//                                     <div>
//                                         <Image
//                                             src={post?.thumbnail}
//                                             alt={post?.metaTitle}
//                                             width={400}
//                                             height={100}
//                                             priority
//                                         />
//                                     </div>
//                                     <div>
//                                         <h2>{post?.prefix}<span> / </span>{post?.title}</h2>
//                                     </div>
//                                     <div>
//                                         <p></p>
//                                     </div>
//                                 </div>
//                             )
//                         })
//                     }
//                 </div>
//                 {/* Right Section */}
//                 <div className='w-1/3'>

//                     {
//                         topPriporityPosts.map((post, i) => {
//                             return (
//                                 <div key={i} className="w-full flex flex-col items-center justify-between">
//                                     <div>
//                                         <Image
//                                             src={post?.thumbnail}
//                                             alt={post?.metaTitle}
//                                             width={400}
//                                             height={100}
//                                             priority
//                                         />
//                                     </div>
//                                     <div>
//                                         <h2>{post?.prefix}<span> / </span>{post?.title}</h2>
//                                     </div>
//                                     <div>
//                                         <p></p>
//                                     </div>
//                                 </div>
//                             )
//                         })
//                     }
//                 </div>

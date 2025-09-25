"use client"
import { Post } from "@/components/DataTypes/Types"
import { useLanguage } from "@/context/LanguageContext"
import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import moment from "moment";

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
        <section className='grid grid-col-12 border-b dark:border-white my-2'>
            {/* Big card section */}
            <div className='col-span-4'>
                {
                    topPriporityPosts.map((post, i) => {
                        const previewBody = post.body.slice(0, 200) + "...";
                        return (
                            <div
                            className="px-2 w-[450px] shadow-md py-4 mb-4" 
                            key={i}>
                                <div className="relative w-full h-60">
                                    <Image
                                    className="rounded-md object-cover"
                                        src={post?.thumbnail}
                                        alt={post?.metaTitle}
                                        fill
                                        priority
                                    />
                                </div>
                                    <p className="text-sm text-right text-gray-600 font-medium">{post.authors} | {moment(post.publishedTime).fromNow()}</p>
                                <div className="py-2">
                                    <h2 className="font-bold text-lg"><span className="text-brand">{post?.prefix} / </span>{post?.title}</h2>
                                </div>
                                <div >
                                    <div dangerouslySetInnerHTML={{ __html: previewBody }}></div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='col-span-8'>
                
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

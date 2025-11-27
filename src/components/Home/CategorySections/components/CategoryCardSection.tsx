import { useLanguage } from "@/context/LanguageContext";
import { Cat, Post } from "@/utils/Types";
import { useEffect, useState } from "react";
import BigCards from "./BigCards";
import SmallCards from "./SmallCards";
import Link from "next/link";


export default function CategoryCardSection({ category }: { category: Cat }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const { lang } = useLanguage();
  const limit = 10
  const offset = 0

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`/api/${category.slug}/?language=${lang}&limit=${limit}&offset=${offset}`)
        const data = await res.json()
        if (data?.data?.length > 0) {
          setPosts(data.data)
        } else {
          setPosts([])
        }
      } catch (error) {
        console.error("error fething post", error)
        setPosts([])
      }
    }
    fetchPosts()
  }, [lang])

  return (
    <div className="border border-gray-300 mt-2">
      <Link href={`/${category.slug}`}>
        <h2 className="text-3xl py-2 px-4 font-semibold text-brand">{category?.odia} {">"} </h2>
      </Link>
      <div className="grid grid-cols-12">
        {/* Big card section */}
        <div className="col-span-6 grid grid-cols-2 gap-1 p-2">
          {
            posts && posts.slice(0, 2).map((post, i) => {
              return (
                <Link href={`${post.category[0].slug}/${post.slug}`} key={i}>
                  <BigCards post={post} />
                </Link>
              )
            })
          }
        </div>

        {/*Small Cards section  */}
        <div className="col-span-6 grid grid-cols-2 gap-1 py-6 px-2 content-start">
          {
            posts.length > 0 ? posts.slice(2).map((post, i) => {
              return (
                <Link href={`${post.category[0].slug}/${post.slug}`} key={i}>
                  <SmallCards
                    post={post}
                   />
                </Link>
              )
            }) :
              <p className=" text-gray-500 text-md p-2 ">No Posts available</p>
          }
        </div>
      </div>
    </div>
  )
}
import { AdsContext } from "@/context/AdsContext";
import { useLanguage } from "@/context/LanguageContext";
import { Post } from "@/utils/Types";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react"

export default function RelatedArticles() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { lang } = useLanguage();
  const params = useParams()
  const topic = params?.topic as string
  const ads = useContext(AdsContext);
  const limit = 20
  const offset = 0

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`/api/${topic}/?language=${lang}&limit=${limit}&offset=${offset}`)
        console.log("res", res);
        const data = await res.json()
        console.log("data", data);
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
  }, [lang, topic])
  console.log("posts", posts);
  
  return (
    <div className="mt-5">
      <div className="py-2">
        <h2 className="text-brand font-extrabold text-3xl">Related Articles</h2>
        <p className="text-gray-600 ">Explore more articles on this category to stay informed with the latest updates</p>
      </div>
    </div>
  )
}
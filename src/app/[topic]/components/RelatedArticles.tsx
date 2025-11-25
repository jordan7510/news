  "use client"
  import { AdsContext } from "@/context/AdsContext";
  import { useLanguage } from "@/context/LanguageContext";
  import { Post } from "@/utils/Types";
  import { useParams } from "next/navigation";
  import { useContext, useEffect, useRef, useState } from "react"
  import RelatedArticlesCard from "./RelatedArticlesCard";

  export default function RelatedArticles() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [offset, setOffset] = useState(0);
    const { lang } = useLanguage();
    const params = useParams()
    const topic = params?.topic as string
    const limit = 20
    const fetchMore = useRef(false)

    useEffect(() => {
      async function fetchInitialPosts() {
        try {
          const res = await fetch(`/api/${topic}/?language=${lang}&limit=${limit}&offset=${offset}`)
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
      fetchInitialPosts()
    }, [lang, topic])

    useEffect(() => {
      function handleScroll() {
        const innerHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const totalScreenHeight = document.body.offsetHeight;
        if (innerHeight + scrollY >= totalScreenHeight - 200) {
          if(fetchMore.current) return
          fetchMore.current = true
          setOffset((prev) => prev + limit)
        }
      }
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    },[])

    useEffect(() => {
      if (offset === 0) return
      const fetchMorePosts = async () => {
        console.log("fetching more posts with offset:",offset);
        
        try {
          const res = await fetch(`/api/${topic}/?language=${lang}&limit=${limit}&offset=${offset}`)
          const data = await res.json()
          if (data?.data?.length > 0) {
            setPosts((prev) => [...prev, ...data.data])
            fetchMore.current = false
          }
        } catch (error) {
          console.error("error fething more post", error)
        }
       
      }
      fetchMorePosts()
    },[offset])
    


    return (
      <div className="mt-5">
        <div className="py-2 my-4">
          <h2 className="text-brand font-extrabold text-3xl">Related Articles</h2>
          <p className="text-gray-600 ">Explore more articles on this category to stay informed with the latest updates</p>
        </div>
        <div className="grid grid-cols-12 gap-4 ">
          {
            posts.map((post, i) => {
              return (
                <RelatedArticlesCard
                  key={i}
                  post={post}
                />
              )
            })
          }
        </div>
      </div>
    )
  }
import { useLanguage } from "@/context/LanguageContext";
import { Cat, Post } from "@/utils/Types";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function CategoryCardSection({ category }: { category: Cat }) {
    const [posts, setPosts] = useState<Post[]>([]);
    const { lang } = useLanguage();
    const limit = 10
    const offset = 0

     useEffect(() => {
        async function fetchPosts() {
          try {
            const res = await fetch(`/api/${category.slug}/?language=${lang}&limit=${limit}&offset=${offset}`)
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
      }, [lang])
    
    console.log("posts", posts);

    return (
        <div className="border border-gray-300 mt-2">
            <h2 className="text-2xl p-4">{category?.odia} {">"} </h2>
            <div className="grid grid-cols-12">
                {/* Big card section */}
                <div className="col-span-6 grid grid-cols-2">

                    <div className="px-2 h-auto shadow-md py-4 mb-4 rounded-md border-b cursor-pointer hover:shadow-brand  duration-300">
                        <div className='overflow-hidden h-[200px] relative rounded-md'>
                            {/* <Image
                                    className="hover:scale-110 duration-300"
                                    src="dfdfdg"
                                    alt="fdgfgfg"
                                    fill
                                    style={{ objectFit: "fill" }}
                                    priority
                                /> */}
                        </div>
                        {/* <p className="text-sm text-right text-gray-600 font-medium">{post.authors} | {moment(post.publishedTime).fromNow()}</p>
                            <div className="py-2">
                                <h2 className="font-bold text-lg"><span className="text-brand">{post?.prefix} / </span>{post?.title}</h2>
                            </div>
                            <div >
                                <div dangerouslySetInnerHTML={{ __html: previewBody }}></div>
                            </div> */}
                    </div>

                </div>

                {/*Small Cards section  */}
                <div className="col-span-6 grid grid-cols-2">

                </div>
            </div>
        </div>
    )
}
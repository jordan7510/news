import { Post } from "@/utils/Types";
import moment from "moment";
import Image from "next/image";

export default function BigCards({ post }: { post: Post }) {
    return (
        <div className="px-2 h-auto shadow-md py-4 mb-4 rounded-md border-b cursor-pointer group hover:shadow-brand  duration-300">
            <div className='overflow-hidden h-[200px] relative rounded-md'>
                <Image
                    className="group-hover:scale-110 duration-300"
                    src={post?.thumbnail}
                    alt={post?.title}
                    fill
                    style={{ objectFit: "fill" }}
                    priority
                />
            </div>
            <p className="text-sm text-right text-gray-600 font-medium py-1">{post.authors} | {moment(post.publishedTime).fromNow()}
            </p>
            <div className="py-2">
                <h2 className="font-bold text-lg group-hover:underline"><span className="text-brand">{post?.prefix} / </span>{post?.title}</h2>
            </div>
            <div >
                <div dangerouslySetInnerHTML={{ __html: post.body.slice(0, 200) + "..." }}></div>
            </div>
        </div>
    )
}
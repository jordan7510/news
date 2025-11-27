import { Post } from "@/utils/Types";
import moment from "moment";
import Image from "next/image";

export default function SmallCards({ post }: { post: Post }) {
    return (
        <div className='grid grid-cols-6 gap-2 rounded-md shadow-md p-2  hover:cursor-pointer group hover:shadow-brand duration-300'>
            <div className='col-span-3 relative h-24 overflow-hidden rounded-lg '>
                <Image
                    src={post.thumbnail}
                    priority
                    alt={post.thumbnail}
                    className=' group-hover:scale-105 duration-300'
                    fill
                />
            </div>

            <div className="col-span-3">
                <h2 className="font-bold text-xs group-hover:underline"><span className="text-brand">{post.location} / </span>{post.title.slice(0, 30)}..</h2>
                <p className="text-xs  text-gray-600 font-medium">{post?.authors} | {moment(post?.publishedTime).fromNow()}</p>
            </div>
        </div>
    )
}
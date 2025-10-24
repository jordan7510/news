import { Post } from '@/utils/Types';
import moment from 'moment'
import Image from 'next/image'
import React from 'react'

export default function CategoryBigCard({ post }: { post: Post }) {
    console.log("post", post);

    return (
        <div>
            <div className='flex flex-col w-full gap-4 rounded-md my-6 shadow-md  hover:cursor-pointer'>
                <div className='relative w-full h-[350px]'>
                    <Image
                        src={post.thumbnail}
                        priority
                        alt={post.thumbnail}
                        className='rounded-t-md'
                        fill
                    />
                </div>

                <div className='px-2'>
                    <h2 className="py-3 font-bold text-lg hover:underline hover:cursor-pointer"><span className="text-brand">{post.location} / </span>{post.title}</h2>
                    <p className="pb-3  text-sm  text-gray-600 font-medium">{post?.authors} | {moment(post?.publishedTime).fromNow()}</p>
                    <p className='text-right py-2 hover:underline cursor-pointer text-blue-600 text-md '>Read More..</p>
                </div>
            </div>
        </div>
    )
}

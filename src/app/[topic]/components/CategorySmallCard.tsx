import { Post } from '@/utils/Types';
import moment from 'moment'
import Image from 'next/image'
import React from 'react'

export default function CategorySmallCard({ post }: { post: Post }) {


    return (
        <div className='flex gap-4 rounded-md my-6 shadow-md p-2  hover:cursor-pointer'>
            <div className='relative w-48 h-24'>
                <Image
                    src={post.thumbnail}
                   fill
                    priority
                    alt={post.thumbnail}
                    className='rounded-lg'
                />
            </div>

            <div>
                <h2 className="py-2 font-semibold text-md hover:underline hover:cursor-pointer"><span className="text-brand">{post.location} / </span>{post.title}</h2>
                <p className="pb-2 text-xs text-right  text-gray-600 font-semibold">{post?.authors} | {moment(post?.publishedTime).fromNow()}</p>
            </div>
        </div>
    )
}

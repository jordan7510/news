import { Post } from '@/utils/Types'
import moment from 'moment'
import React from 'react'
import Image from 'next/image'

export default function CategoryTrendingCard({ post }: { post: Post }) {
    return (
        <div className='flex gap-4 h-24 rounded-md my-6 shadow-md p-2  hover:cursor-pointer'>
            <div className='relative h-full w-48'>
                <Image
                    src={post.thumbnail}
                    priority
                    alt={post.thumbnail}
                    className='rounded-lg'
                    fill
                />
            </div>

            <div>
                <h2 className="font-bold text-xs hover:underline hover:cursor-pointer"><span className="text-brand">{post.location} / </span>{post.title.slice(0,30)}..</h2>
                <p className="text-xs  text-gray-600 font-medium">{post?.authors} | {moment(post?.publishedTime).fromNow()}</p>
            </div>
        </div>
    )
}

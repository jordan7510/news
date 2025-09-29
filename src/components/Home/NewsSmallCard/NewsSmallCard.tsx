import { Post } from '@/components/DataTypes/Types';
import moment from 'moment'
import Image from 'next/image'
import React from 'react'

export default function NewsSmallCard({post}:{post:Post}){
    return (
        <div className="px-2 shadow-md py-4 mb-4 border-b rounded-md cursor-pointer hover:shadow-brand duration-300 ">
            <div className='overflow-hidden rounded-md'>
                <Image
                    className="rounded-md hover:scale-110 overflow-hidden duration-300"
                    src={post?.thumbnail}
                    alt={post?.metaTitle}
                    priority
                    height={100}
                    width={300}
                />
            </div>
            <p className="text-xs text-right text-gray-600 font-medium">{post.authors} | {moment(post.publishedTime).fromNow()}</p>
            <div className="py-2">
                <h2 className="text-sm font-medium"><span className="text-brand">{post?.prefix} / </span>{post?.title}</h2>
            </div>
        </div>
    )
}

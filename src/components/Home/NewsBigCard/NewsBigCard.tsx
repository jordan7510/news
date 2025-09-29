import { Post } from '@/components/DataTypes/Types';
import moment from 'moment'
import Image from 'next/image'
import React from 'react'

export default function NewsBigCard({post}:{post:Post}){
    const previewBody = post.body.slice(0, 200) + "...";
    return (
        <div className="px-2 shadow-md py-4 mb-4 rounded-md border-b flex-1 cursor-pointer hover:shadow-brand  duration-300">
            <div className='overflow-hidden rounded-md'>
                <Image
                     className="rounded-md hover:scale-110 overflow-hidden duration-300"
                    src={post?.thumbnail}
                    alt={post?.metaTitle}
                    height={200}
                    width={450}
                    priority
                />
            </div>
            <p className="text-sm text-right text-gray-600 font-medium">{post.authors} | {moment(post.publishedTime).fromNow()}</p>
            <div className="py-2">
                <h2 className="font-bold text-lg"><span className="text-brand">{post?.prefix} / </span>{post?.title}</h2>
            </div>
            <div >
                <div dangerouslySetInnerHTML={{ __html: previewBody }}></div>
            </div>
        </div>
    )
}

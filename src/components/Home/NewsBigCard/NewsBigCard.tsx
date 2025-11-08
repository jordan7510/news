import { Post } from '@/utils/Types';
import moment from 'moment'
import Image from 'next/image'
import React from 'react'

export default function NewsBigCard({post}:{post:Post}){
    const previewBody = post.body.slice(0, 200) + "...";
    return (
        <div className="px-2 h-auto shadow-md py-4 mb-4 rounded-md border-b cursor-pointer hover:shadow-brand  duration-300">
            <div className='overflow-hidden h-[200px] relative rounded-md'>
                <Image
                     className="hover:scale-110 duration-300"
                    src={post?.thumbnail}
                    alt={post?.metaTitle}
                    fill
                    style={{objectFit:"fill"}}
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

import { Post } from '@/utils/Types'
import moment from 'moment';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

export default function RelatedArticlesCard({ post }: { post: Post }) {
    return (
        <div className='md:col-span-3 col-span-6 h-full w-full shadow-md group'>
            <Link href={`/${post.category[0].slug}/${post.slug}`}  >
                <div className='w-full h-full flex flex-col group-hover:cursor-pointer'>
                    <div className='relative h-40 overflow-hidden'>
                        <Image
                            src={post.thumbnail}
                            alt={post.thumbnail}
                            fill
                            priority
                            className='group-hover:scale-105 duration-300'
                            style={{objectFit:"fill"}}
                        />
                    </div>

                    <div className='p-2'>
                        <p className="py-2 font-semibold text-xs hover:underline hover:cursor-pointer"><span className="text-brand">{post.location} / </span>{post.title}</p>
                        <p className="pb-2 text-[10px] text-left  text-gray-600">{post?.authors} | {moment(post?.publishedTime).fromNow()}</p>
                    </div>
                </div>
            </Link>
        </div>


    )
}

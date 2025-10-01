"use client"
import { useParams } from 'next/navigation'
import React from 'react'


export default function CategoryDetailPage() {
  
  const params = useParams()
  const slug = params?.category as string
  console.log("slug",slug);
  

  return (
    <section>
      <p>Category detail page  of {slug}</p>
    </section>
  )
}

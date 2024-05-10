import Posts from '@/components/posts'
import { IPost } from '@/interfaces/Post'
import { getPosts } from '@/lib/posts'
import React from 'react'

const FeedPage = async() => {
  const posts = await getPosts() as IPost[]
  return (
    <>
        <h1>All posts by users</h1>
        <Posts posts={posts}/>
    </>
  )
}

export default FeedPage
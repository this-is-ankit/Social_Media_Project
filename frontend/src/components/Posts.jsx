import React from 'react'
import Post from './Post'
import { useSelector } from 'react-redux'
import Loader from './CustomLoader'

const Posts = () => {
  const { posts, loading } = useSelector(store => store.post);
  return (
    <div>
      {
        loading ? (
          <div className='flex flex-col gap-4'>
            {[1, 2, 3].map((_, index) => <Loader key={index} />)}
          </div>
        ) : (
          posts.map((post) => <Post key={post._id} post={post} />)
        )
      }
    </div>
  )
}

export default Posts
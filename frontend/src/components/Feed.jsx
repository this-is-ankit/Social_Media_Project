import React from 'react'
import Posts from './Posts'
import StoryBar from './StoryBar'

const Feed = () => {
    return (
        <div className='flex-1 my-8 flex flex-col items-center'>
            <StoryBar />
            <Posts />
        </div>
    )
}

export default Feed
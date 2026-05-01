import React from 'react'
import { useSelector } from 'react-redux'
import { Heart, MessageCircle } from 'lucide-react'
import useGetExplorePosts from '@/Hooks/useGetExplorePosts'

const Explore = () => {
    useGetExplorePosts();
    const { explorePosts } = useSelector(store => store.post);

    return (
        <div className='max-w-4xl mx-auto my-10 px-4 md:px-0'>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-1'>
                {
                    explorePosts.map((post) => (
                        <div key={post?._id} className='relative group cursor-pointer aspect-square'>
                            <img src={post.image} alt='postimage' className='w-full h-full object-cover rounded-sm' />
                            <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                <div className='flex items-center text-white gap-6 font-bold'>
                                    <div className='flex items-center gap-1'>
                                        <Heart fill='white' className='h-5 w-5' />
                                        <span>{post?.likes.length}</span>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <MessageCircle fill='white' className='h-5 w-5' />
                                        <span>{post?.comments.length}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            {
                explorePosts.length === 0 && (
                    <div className='text-center my-20 text-gray-500'>
                        No posts to explore yet.
                    </div>
                )
            }
        </div>
    )
}

export default Explore

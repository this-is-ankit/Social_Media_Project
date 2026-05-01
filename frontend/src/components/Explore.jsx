import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Input } from './ui/input'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Search, Heart, MessageCircle } from 'lucide-react'
import axios from 'axios'
import useGetExplorePosts from '@/Hooks/useGetExplorePosts'
import { Link } from 'react-router-dom'

const Explore = () => {
    useGetExplorePosts();
    const { explorePosts } = useSelector(store => store.post);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchQuery) {
                try {
                    const res = await axios.get(`http://localhost:8000/api/v1/user/suggested`, { withCredentials: true });
                    if (res.data.success) {
                        const filteredUsers = res.data.users.filter(user => 
                            user.username.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                        setSearchResults(filteredUsers);
                        setShowResults(true);
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                setSearchResults([]);
                setShowResults(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    return (
        <div className='max-w-4xl mx-auto my-10 pl-20'>
            <div className='relative mb-8 max-w-md mx-auto'>
                <div className='flex items-center bg-gray-100 rounded-md px-3 py-1'>
                    <Search className='text-gray-500 h-4 w-4' />
                    <Input 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        type="text" 
                        placeholder="Search users..." 
                        className='bg-transparent border-none focus-visible:ring-0 focus-visible:ring-transparent'
                    />
                </div>
                {
                    showResults && (
                        <div className='absolute top-full left-0 w-full bg-white border border-gray-200 rounded-md shadow-lg z-20 mt-1 max-h-60 overflow-y-auto'>
                            {
                                searchResults.length > 0 ? (
                                    searchResults.map((user) => (
                                        <Link 
                                            key={user?._id} 
                                            to={`/profile/${user?._id}`} 
                                            className='flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer'
                                            onClick={() => setShowResults(false)}
                                        >
                                            <Avatar className='h-8 w-8'>
                                                <AvatarImage src={user?.profilePicture} />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                            <span className='font-medium text-sm'>{user?.username}</span>
                                        </Link>
                                    ))
                                ) : (
                                    <div className='p-3 text-center text-gray-500 text-sm'>No users found</div>
                                )
                            }
                        </div>
                    )
                }
            </div>

            <div className='grid grid-cols-3 gap-1'>
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

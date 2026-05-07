import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Input } from './ui/input'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Search as SearchIcon, User } from 'lucide-react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchQuery) {
                try {
                    const res = await axios.get(`${USER_API_END_POINT}/suggested`, { withCredentials: true });
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
        <div className='max-w-xl mx-auto my-10 px-4'>
            <h1 className='font-bold text-2xl mb-6'>Search</h1>
            <div className='relative mb-8'>
                <div className='flex items-center bg-gray-100 dark:bg-neutral-800 rounded-md px-3 py-2'>
                    <SearchIcon className='text-gray-500 h-5 w-5' />
                    <Input 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                        type="text" 
                        placeholder="Search users..." 
                        className='bg-transparent border-none focus-visible:ring-0 focus-visible:ring-transparent text-slate-900 dark:text-slate-50'
                    />
                </div>
            </div>

            <div className='flex flex-col gap-4'>
                {
                    searchQuery ? (
                        searchResults.length > 0 ? (
                            searchResults.map((user) => (
                                <Link 
                                    key={user?._id} 
                                    to={`/profile/${user?._id}`} 
                                    className='flex items-center gap-3 p-3 hover:bg-gray-50 hover:text-slate-900 dark:hover:text-black rounded-lg transition-all cursor-pointer'
                                >
                                    <Avatar className='h-12 w-12'>
                                        <AvatarImage src={user?.profilePicture} />
                                        <AvatarFallback><User className="w-5 h-5 text-gray-500" /></AvatarFallback>
                                    </Avatar>
                                    <div className='flex flex-col'>
                                        <span className='font-bold text-sm'>{user?.username}</span>
                                        <span className='text-gray-500 text-xs'>{user?.bio || "No bio available"}</span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className='text-center my-10 text-gray-500'>No users found for "{searchQuery}"</div>
                        )
                    ) : (
                        <div className='text-center my-10 text-gray-500'>
                            <p>Recent searches will appear here.</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Search

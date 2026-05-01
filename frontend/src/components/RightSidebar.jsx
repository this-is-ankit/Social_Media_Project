import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import useGetSuggestedUsers from '@/Hooks/useGetSuggestedUsers';
import { updateFollowing } from '@/redux/authSlice';
import axios from 'axios';
import { toast } from 'sonner';

import { User } from 'lucide-react';

const RightSidebar = () => {
    useGetSuggestedUsers();
    const { user, suggestedUsers } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const followHandler = async (userId) => {
        dispatch(updateFollowing(userId));
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/user/followorunfollow/${userId}`, {}, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
            dispatch(updateFollowing(userId)); // Revert optimistic update
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className='hidden lg:block lg:w-80 my-10 pr-[10%]'>
            {/* Logged-in User Info */}
            <div className='flex items-center gap-3 mb-6'>
                <Link to={`/profile/${user?._id}`}>
                    <Avatar className='w-14 h-14'>
                        <AvatarImage src={user?.profilePicture} alt="post_image" />
                        <AvatarFallback><User className="w-5 h-5 text-gray-500" /></AvatarFallback>
                    </Avatar>
                </Link>
                <div className='flex flex-col'>
                    <Link to={`/profile/${user?._id}`} className='font-semibold text-sm hover:underline'>
                        {user?.username}
                    </Link>
                    <span className='text-gray-500 text-sm truncate w-32'>{user?.bio || "Bio here..."}</span>
                </div>
                <button className='text-[#0095F6] text-xs font-bold hover:text-blue-800 ml-4'>Switch</button>
            </div>

            {/* Suggestions Header */}
            <div className='flex items-center justify-between gap-10 mb-4'>
                <h1 className='font-semibold text-gray-500 text-sm'>Suggested for you</h1>
                <button className='font-semibold text-xs hover:text-gray-400'>See All</button>
            </div>

            {/* Suggestions List */}
            <div className='flex flex-col gap-4'>
                {
                    suggestedUsers?.length > 0 ? (
                        suggestedUsers.map((suggestedUser) => (
                            <div key={suggestedUser._id} className='flex items-center justify-between gap-4 p-2 rounded-lg hover:bg-gray-50 hover:text-slate-900 dark:hover:text-black transition-all'>
                                <div className='flex items-center gap-3'>
                                    <Link to={`/profile/${suggestedUser._id}`}>
                                        <Avatar className='w-9 h-9'>
                                            <AvatarImage src={suggestedUser.profilePicture} alt="post_image" />
                                            <AvatarFallback><User className="w-5 h-5 text-gray-500" /></AvatarFallback>
                                        </Avatar>
                                    </Link>
                                    <div className='flex flex-col'>
                                        <Link to={`/profile/${suggestedUser._id}`} className='font-semibold text-sm hover:underline'>
                                            {suggestedUser.username}
                                        </Link>
                                        <span className='text-gray-500 text-xs truncate w-32'>
                                            {suggestedUser.bio || "Suggested for you"}
                                        </span>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => followHandler(suggestedUser._id)} 
                                    className='text-[#0095F6] text-xs font-bold hover:text-blue-800'
                                >
                                    Follow
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className='text-gray-400 text-sm'>No suggestions available.</p>
                    )
                }
            </div>

            {/* Sidebar Footer */}
            <div className='mt-10 text-gray-400 text-xs font-normal'>
                <p className='hover:underline cursor-pointer mb-2'>About &bull; Help &bull; Press &bull; API &bull; Jobs &bull; Privacy &bull; Terms</p>
                <p>&copy; 2024 FLIK</p>
            </div>
        </div>
    );
};

export default RightSidebar;

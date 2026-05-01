import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import useGetUserProfile from '@/Hooks/useGetUserProfile';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Heart, MessageCircle, User } from 'lucide-react';
import EditProfile from './EditProfile';
import axios from 'axios';
import { toast } from 'sonner';
import { updateFollowing } from '@/redux/authSlice';

const Profile = () => {
    const params = useParams();
    const userId = params.id;
    useGetUserProfile(userId);
    const [open, setOpen] = useState(false);
    const { userProfile, user } = useSelector(store => store.auth);
    const [activeTab, setActiveTab] = useState('posts');
    const dispatch = useDispatch();

    const isLoggedInUser = user?._id === userProfile?._id;
    const isFollowing = user?.following?.includes(userProfile?._id);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    }

    const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

    const followAndUnfollowHandler = async () => {
        // Optimistic UI update
        dispatch(updateFollowing(userProfile?._id));
        try {
            const res = await axios.post(`http://localhost:8000/api/v1/user/followorunfollow/${userProfile?._id}`, {}, { withCredentials: true });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            // Revert on error
            dispatch(updateFollowing(userProfile?._id));
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    if (!userProfile) {
        return (
            <div className='flex items-center justify-center h-screen'>
                <p className='text-gray-500 font-semibold'>Loading profile...</p>
            </div>
        )
    }

    return (
        <div className='flex max-w-5xl justify-center mx-auto px-4 md:px-10'>
            <div className='flex flex-col gap-10 md:gap-20 p-4 md:p-8 w-full'>
                <div className='flex flex-col md:grid md:grid-cols-2 gap-10'>
                    <section className='flex items-center justify-center'>
                        <Avatar className='h-24 w-24 md:h-32 md:w-32'>
                            <AvatarImage src={userProfile?.profilePicture} alt="profilepicture" />
                            <AvatarFallback><User className="w-5 h-5 text-gray-500" /></AvatarFallback>
                        </Avatar>
                    </section>
                    <section>
                        <div className='flex flex-col gap-5'>
                            <div className='flex flex-col md:flex-row items-center md:items-start gap-5'>
                                <span className='font-bold text-xl'>{userProfile?.username}</span>
                                {
                                    isLoggedInUser ? (
                                        <div className='flex items-center gap-2'>
                                            <Button onClick={() => setOpen(true)} variant='secondary' className='hover:bg-gray-200 hover:text-slate-900 dark:hover:text-black h-8 font-semibold'>Edit profile</Button>
                                            <Button variant='secondary' className='hover:bg-gray-200 hover:text-slate-900 dark:hover:text-black h-8 font-semibold'>View archive</Button>
                                        </div>
                                    ) : (
                                        <div className='flex items-center gap-2'>
                                            {
                                                isFollowing ? (
                                                    <Button onClick={followAndUnfollowHandler} variant='secondary' className='h-8 font-semibold'>Unfollow</Button>
                                                ) : (
                                                    <Button onClick={followAndUnfollowHandler} className='bg-[#0095F6] hover:bg-[#3192d2] text-white h-8 font-semibold px-6'>Follow</Button>
                                                )
                                            }
                                            <Button variant='secondary' className='h-8 font-semibold'>Message</Button>
                                        </div>
                                    )
                                }
                            </div>
                            <div className='flex items-center justify-center md:justify-start gap-6 md:gap-10'>
                                <p><span className='font-bold'>{userProfile?.posts?.length || 0} </span>posts</p>
                                <p><span className='font-bold'>{userProfile?.followers?.length || 0} </span>followers</p>
                                <p><span className='font-bold'>{userProfile?.following?.length || 0} </span>following</p>
                            </div>
                            <div className='flex flex-col gap-1 items-center md:items-start'>
                                <span className='font-bold text-sm'>{userProfile?.username}</span>
                                <p className='text-sm whitespace-pre-wrap text-center md:text-left'>{userProfile?.bio || 'No bio yet.'}</p>
                                {userProfile?.gender && <span className='text-xs text-gray-500 capitalize'>{userProfile?.gender}</span>}
                            </div>
                        </div>
                    </section>
                </div>
                
                <div className='border-t border-t-gray-200'>
                    <div className='flex items-center justify-center gap-14 uppercase tracking-widest text-xs font-semibold'>
                        <span onClick={() => handleTabChange('posts')} className={`py-4 cursor-pointer flex items-center gap-1 ${activeTab === 'posts' ? 'border-t border-t-black text-black' : 'text-gray-400'}`}>
                            Posts
                        </span>
                        <span onClick={() => handleTabChange('saved')} className={`py-4 cursor-pointer flex items-center gap-1 ${activeTab === 'saved' ? 'border-t border-t-black text-black' : 'text-gray-400'}`}>
                            Saved
                        </span>
                        <span className='py-4 cursor-pointer text-gray-400'>Reels</span>
                        <span className='py-4 cursor-pointer text-gray-400'>Tagged</span>
                    </div>
                    
                    {displayedPost && displayedPost.length > 0 ? (
                        <div className='grid grid-cols-3 gap-1'>
                            {displayedPost.map((post) => (
                                <div key={post?._id} className='relative group cursor-pointer aspect-square'>
                                    <img src={post.image} alt='postimage' className='w-full h-full object-cover' />
                                    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                        <div className='flex items-center text-white gap-8 font-bold'>
                                            <div className='flex items-center gap-1'>
                                                <Heart className='fill-white' />
                                                <span>{post?.likes?.length || 0}</span>
                                            </div>
                                            <div className='flex items-center gap-1'>
                                                <MessageCircle className='fill-white' />
                                                <span>{post?.comments?.length || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='flex flex-col items-center justify-center py-20 gap-4'>
                            <div className='p-4 border-2 border-black rounded-full'>
                                <MessageCircle size={40} />
                            </div>
                            <h1 className='text-3xl font-extrabold'>No posts yet</h1>
                            <p className='text-sm text-center max-w-xs'>When you share photos, they will appear here on your profile.</p>
                        </div>
                    )}
                </div>
            </div>
            <EditProfile open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile

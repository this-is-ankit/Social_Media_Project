import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import useGetUserProfile from '@/Hooks/useGetUserProfile';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Heart, MessageCircle } from 'lucide-react';
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
    const isFollowing = user?.following.includes(userProfile?._id);

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
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className='flex max-w-5xl justify-center mx-auto pl-10'>
            <div className='flex flex-col gap-20 p-8'>
                <div className='grid grid-cols-2'>
                    <section className='flex items-center justify-center'>
                        <Avatar className='h-32 w-32'>
                            <AvatarImage src={userProfile?.profilePicture} alt="profilepicture" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </section>
                    <section>
                        <div className='flex flex-col gap-5'>
                            <div className='flex items-center gap-2'>
                                <span className='font-bold text-lg'>{userProfile?.username}</span>
                                {
                                    isLoggedInUser ? (
                                        <>
                                            <Button onClick={() => setOpen(true)} variant='secondary' className='hover:bg-gray-200 h-8'>Edit profile</Button>
                                            <Button variant='secondary' className='hover:bg-gray-200 h-8'>View archive</Button>
                                            <Button variant='secondary' className='hover:bg-gray-200 h-8'>Ad tools</Button>
                                        </>
                                    ) : (
                                        isFollowing ? (
                                            <>
                                                <Button onClick={followAndUnfollowHandler} variant='secondary' className='h-8'>Unfollow</Button>
                                                <Button variant='secondary' className='h-8'>Message</Button>
                                            </>
                                        ) : (
                                            <Button onClick={followAndUnfollowHandler} className='bg-[#0095F6] hover:bg-[#3192d2] h-8'>Follow</Button>
                                        )
                                    )
                                }
                            </div>
                            <div className='flex items-center gap-4'>
                                <p><span className='font-semibold'>{userProfile?.posts.length} </span>posts</p>
                                <p><span className='font-semibold'>{userProfile?.followers.length} </span>followers</p>
                                <p><span className='font-semibold'>{userProfile?.following.length} </span>following</p>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <span className='font-semibold'>{userProfile?.bio || 'bio here...'}</span>
                                <div className='bg-gray-200 w-fit px-2 py-1 rounded-full text-xs'>
                                    <span>@{userProfile?.username}</span>
                                </div>
                                <span>{userProfile?.gender}</span>
                            </div>
                        </div>
                    </section>
                </div>
                <div className='border-t border-t-gray-200'>
                    <div className='flex items-center justify-center gap-10 uppercase tracking-widest text-sm'>
                        <span onClick={() => handleTabChange('posts')} className={`py-3 cursor-pointer ${activeTab === 'posts' ? 'border-t border-t-black font-bold' : ''}`}>Posts</span>
                        <span onClick={() => handleTabChange('saved')} className={`py-3 cursor-pointer ${activeTab === 'saved' ? 'border-t border-t-black font-bold' : ''}`}>Saved</span>
                        <span className='py-3 cursor-pointer'>Reels</span>
                        <span className='py-3 cursor-pointer'>Tagged</span>
                    </div>
                    <div className='grid grid-cols-3 gap-1'>
                        {
                            displayedPost?.map((post) => {
                                return (
                                    <div key={post?._id} className='relative group cursor-pointer'>
                                        <img src={post.image} alt='postimage' className='rounded-sm my-2 w-full aspect-square object-cover' />
                                        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                            <div className='flex items-center text-white gap-6'>
                                                <button className='flex items-center gap-2 hover:text-gray-300'>
                                                    <Heart />
                                                    <span>{post?.likes.length}</span>
                                                </button>
                                                <button className='flex items-center gap-2 hover:text-gray-300'>
                                                    <MessageCircle />
                                                    <span>{post?.comments.length}</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <EditProfile open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile

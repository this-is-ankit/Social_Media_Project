import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog'
import React, { useRef, useState } from 'react'
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { readFileAsDataURL } from '@/lib/utils';
import { Loader2, User } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '@/redux/postSlice';



const CreatePost = ({ open, setOpen }) => {
    const fileRef = useRef();
    const [file, setFile] = useState("");
    const [caption, setCaption] = useState("");
    const [preview, setPreview] = useState("");
    const [isVideo, setIsVideo] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const { posts } = useSelector(store => store.post)
    const dispatch = useDispatch();

    const fileChangeHandler = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            setIsVideo(file.type.startsWith('video/'));
            const dataUrl = await readFileAsDataURL(file);
            setPreview(dataUrl);
        }
    }

    const createPostHandler = async (e) => {
        const formData = new FormData();
        formData.append("caption", caption);
        if (file) formData.append("image", file);
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/v1/post/addpost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setPosts([res.data.post, ...posts]))
                toast.success(res.data.message);
                setOpen(false);
                setCaption("");
                setFile("");
                setPreview("");
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setOpen(false)} className="bg-white text-black border-none">
                <DialogHeader className="text-center font-semibold">Create New Post</DialogHeader>
                <div className='flex gap-3 items-center'>
                    <Avatar>
                        <AvatarImage src={user?.profilePicture} alt="image" />
                        <AvatarFallback><User className="w-5 h-5 text-gray-500" /></AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className='font-semibold text-xs'>{user?.username}</h1>
                        <span className='text-gray-600 text-xs'>Sharing with followers...</span>
                    </div>
                </div>
                <Textarea value={caption} onChange={(e) => setCaption(e.target.value)} className='focus-visible:ring-transparent border-none' placeholder="Write a caption..." />
                {
                    preview && (
                        <div className='w-full h-64 flex items-center justify-center bg-black rounded-md overflow-hidden'>
                            {isVideo ? (
                                <video src={preview} controls className='h-full w-full object-contain' />
                            ) : (
                                <img src={preview} alt="preview_img" className='object-cover h-full w-full' />
                            )}
                        </div>
                    )
                }
                <input ref={fileRef} type='file' className='hidden' accept="image/*,video/*" onChange={fileChangeHandler} />
                <Button onClick={() => fileRef.current.click()} className="w-fit mx-auto bg-[#0095F6] hover:bg-[#489ad1] cursor-pointer">Select From Device</Button>
                {
                    preview && (
                        loading ? (
                            <Button className="w-full">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait ..
                            </Button>
                        ) : (
                            <Button onClick={createPostHandler} type="submit" className="w-full mx-auto cursor-pointer hover:bg-gray-200">Post</Button>
                        )
                    )
                }

            </DialogContent>
        </Dialog>
    )
}

export default CreatePost;

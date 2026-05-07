import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setScrolls } from '@/redux/postSlice';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Heart, MessageCircle, Send, Bookmark, Music, User } from 'lucide-react';
import { POST_API_END_POINT } from '@/utils/constant';

const ScrollItem = ({ scroll }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    videoRef.current.play();
                    setIsPlaying(true);
                } else {
                    videoRef.current.pause();
                    setIsPlaying(false);
                }
            },
            { threshold: 0.7 }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    const togglePlay = () => {
        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <div className="snap-start h-screen w-full flex items-center justify-center bg-black relative">
            <video
                ref={videoRef}
                src={scroll.image} // Reusing image field for video URL
                className="h-full w-full object-contain cursor-pointer"
                loop
                muted
                onClick={togglePlay}
                playsInline
            />
            
            {/* Overlay Info */}
            <div className="absolute bottom-10 left-4 right-16 text-white z-10">
                <div className="flex items-center gap-2 mb-3">
                    <Avatar className="w-9 h-9 border border-white">
                        <AvatarImage src={scroll.author?.profilePicture} />
                        <AvatarFallback><User className="w-5 h-5 text-gray-500" /></AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-sm">{scroll.author?.username}</span>
                    <button className="border border-white px-2 py-0.5 rounded-md text-xs font-bold ml-2">
                        Follow
                    </button>
                </div>
                <p className="text-sm line-clamp-2 mb-3">{scroll.caption}</p>
                <div className="flex items-center gap-2 text-xs">
                    <Music className="w-3 h-3" />
                    <span className="truncate">Original audio - {scroll.author?.username}</span>
                </div>
            </div>

            {/* Side Actions */}
            <div className="absolute bottom-10 right-4 flex flex-col gap-6 items-center z-10 text-white">
                <div className="flex flex-col items-center gap-1">
                    <Heart className="w-7 h-7 cursor-pointer hover:text-gray-300 transition-colors" />
                    <span className="text-xs font-semibold">{scroll.likes?.length || 0}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <MessageCircle className="w-7 h-7 cursor-pointer hover:text-gray-300 transition-colors" />
                    <span className="text-xs font-semibold">{scroll.comments?.length || 0}</span>
                </div>
                <Send className="w-7 h-7 cursor-pointer hover:text-gray-300 transition-colors" />
                <Bookmark className="w-7 h-7 cursor-pointer hover:text-gray-300 transition-colors" />
            </div>
        </div>
    );
};

const Scrolls = () => {
    const dispatch = useDispatch();
    const { scrolls } = useSelector(store => store.post);

    useEffect(() => {
        const fetchScrolls = async () => {
            try {
                const res = await axios.get(`${POST_API_END_POINT}/scrolls`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setScrolls(res.data.scrolls));
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchScrolls();
    }, [dispatch]);

    return (
        <div className="h-screen w-full bg-black overflow-y-scroll snap-y snap-mandatory no-scrollbar">
            {scrolls && scrolls.length > 0 ? (
                scrolls.map((scroll) => (
                    <ScrollItem key={scroll._id} scroll={scroll} />
                ))
            ) : (
                <div className="h-full flex items-center justify-center text-white">
                    <p>No scrolls available yet.</p>
                </div>
            )}
        </div>
    );
};

export default Scrolls;

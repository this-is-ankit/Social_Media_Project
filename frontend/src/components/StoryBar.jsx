import React, { useEffect, useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import axios from 'axios';
import { Plus, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import StoryViewer from './StoryViewer';

const StoryBar = () => {
    const [stories, setStories] = useState([]);
    const [groupedStories, setGroupedStories] = useState({});
    const [viewerOpen, setViewerOpen] = useState(false);
    const [selectedUserStories, setSelectedUserStories] = useState([]);
    const { user } = useSelector(store => store.auth);
    const fileInputRef = useRef(null);

    const fetchStories = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/v1/story/all', { withCredentials: true });
            if (res.data.success) {
                setStories(res.data.stories);
                
                // Group stories by user
                const grouped = res.data.stories.reduce((acc, story) => {
                    const userId = story.user._id;
                    if (!acc[userId]) {
                        acc[userId] = {
                            user: story.user,
                            stories: []
                        };
                    }
                    acc[userId].stories.push(story);
                    return acc;
                }, {});
                setGroupedStories(grouped);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchStories();
    }, []);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post('http://localhost:8000/api/v1/story/add', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                fetchStories();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add story");
        }
    };

    const openViewer = (userStories) => {
        setSelectedUserStories(userStories);
        setViewerOpen(true);
    };

    return (
        <div className="flex gap-4 p-4 overflow-x-auto bg-white border border-gray-200 rounded-lg mb-6 no-scrollbar">
            {/* Add Story Button */}
            <div className="flex flex-col items-center gap-1 min-w-[70px]">
                <div 
                    className="relative cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Avatar className="w-16 h-16 border-2 border-gray-200">
                        <AvatarImage src={user?.profilePicture} />
                        <AvatarFallback><User className="w-5 h-5 text-gray-500" /></AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 border-2 border-white">
                        <Plus className="w-3 h-3 text-white" />
                    </div>
                </div>
                <span className="text-xs text-gray-500">Your Story</span>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileUpload}
                />
            </div>

            {/* Stories */}
            {Object.values(groupedStories).map((group) => (
                <div 
                    key={group.user._id} 
                    className="flex flex-col items-center gap-1 min-w-[70px] cursor-pointer"
                    onClick={() => openViewer(group.stories)}
                >
                    <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-fuchsia-600">
                        <div className="p-[2px] rounded-full bg-white">
                            <Avatar className="w-16 h-16">
                                <AvatarImage src={group.user.profilePicture} />
                                <AvatarFallback><User className="w-5 h-5 text-gray-500" /></AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                    <span className="text-xs text-gray-600 truncate w-16 text-center">
                        {group.user.username}
                    </span>
                </div>
            ))}

            <StoryViewer 
                open={viewerOpen} 
                setOpen={setViewerOpen} 
                stories={selectedUserStories} 
            />
        </div>
    );
};

export default StoryBar;

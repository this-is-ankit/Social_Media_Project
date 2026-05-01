import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogClose } from './ui/dialog';
import { X } from 'lucide-react';

const StoryViewer = ({ open, setOpen, stories }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!open) return;

        setProgress(0);
        const duration = 5000; // 5 seconds
        const interval = 50; // Update every 50ms
        const step = (interval / duration) * 100;

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    if (currentIndex < stories.length - 1) {
                        setCurrentIndex(currentIndex + 1);
                        return 0;
                    } else {
                        setOpen(false);
                        return 100;
                    }
                }
                return prev + step;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [open, currentIndex, stories.length, setOpen]);

    useEffect(() => {
        if (open) {
            setCurrentIndex(0);
            setProgress(0);
        }
    }, [open]);

    if (!stories || stories.length === 0) return null;

    const currentStory = stories[currentIndex];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden bg-black border-none shadow-none outline-none focus:ring-0 duration-200">
                <DialogTitle className="sr-only">Story Viewer</DialogTitle>
                <div className="relative w-full aspect-[9/16] flex items-center justify-center bg-black">
                    {/* Progress Bars */}
                    <div className="absolute top-3 left-0 right-0 px-2 flex gap-1 z-20">
                        {stories.map((_, index) => (
                            <div key={index} className="h-[2px] flex-1 bg-white/30 rounded-full overflow-hidden">
                                <div
                                    className={`h-full bg-white ${index === currentIndex ? 'transition-all duration-75' : ''}`}
                                    style={{
                                        width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%'
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Header: User Info & Close Button */}
                    <div className="absolute top-6 left-0 right-0 px-4 flex items-center justify-between z-20">
                        <div className="flex items-center gap-2">
                            <img
                                src={currentStory.user?.profilePicture}
                                alt={currentStory.user?.username}
                                className="w-8 h-8 rounded-full border border-white/20"
                            />
                            <span className="text-white font-semibold text-sm drop-shadow-md">
                                {currentStory.user?.username}
                            </span>
                        </div>
                        <DialogClose className="text-white hover:opacity-70 transition-opacity">
                            <X className="w-6 h-6" />
                        </DialogClose>
                    </div>

                    {/* Story Image */}
                    <img
                        src={currentStory.image}
                        alt="Story"
                        className="w-full h-full object-contain select-none"
                    />

                    {/* Navigation Overlays */}
                    <div className="absolute inset-0 flex z-10">
                        <div 
                            className="w-1/3 h-full cursor-pointer" 
                            onClick={() => {
                                if (currentIndex > 0) {
                                    setCurrentIndex(currentIndex - 1);
                                    setProgress(0);
                                }
                            }}
                        />
                        <div 
                            className="w-2/3 h-full cursor-pointer" 
                            onClick={() => {
                                if (currentIndex < stories.length - 1) {
                                    setCurrentIndex(currentIndex + 1);
                                    setProgress(0);
                                } else {
                                    setOpen(false);
                                }
                            }}
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default StoryViewer;

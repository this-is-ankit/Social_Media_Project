import React, { useState } from 'react'
import { Home, Search, Heart, TrendingUp, MessageCircle, PlusSquare, LogOut, Video, Menu, User } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '@/redux/authSlice'
import CreatePost from './CreatePost'
import Notifications from './Notifications'
import { setPosts, setSelectedPost } from '@/redux/postSlice'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'


const LeftSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const { user } = useSelector(store => store.auth);
  const { notifications } = useSelector(store => store.realTimeNotification || { notifications: [] });

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout", { withCredentials: true });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null))
        dispatch(setPosts([]));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  const sidebarHandler = (textType) => {
    if (textType === 'Logout') {
      logoutHandler();
    } else if (textType === 'Create') {
      setOpen(true);
    } else if (textType === "Home") {
      navigate("/");
    } else if (textType === "Search") {
      navigate("/search");
    } else if (textType === "Messages") {
      navigate("/chat");
    } else if (textType === "Explore") {
      navigate("/explore");
    } else if (textType === "Scrolls") {
      navigate("/scrolls");
    } else if (textType === "Notifications") {
      setOpenNotifications(true);
    } else if (textType === "Profile") {
      navigate(`/profile/${user?._id}`);
    }
  }

  const sidebarItems = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <Video />, text: "Scrolls" },
    { icon: <MessageCircle />, text: "Messages" },
    {
      icon: (
        <div className='relative'>
          <Heart />
          {
            notifications.length > 0 && (
              <span className='absolute -top-1 -right-1 h-2 w-2 bg-red-600 rounded-full'></span>
            )
          }
        </div>
      ), text: "Notifications"
    },
    { icon: <PlusSquare />, text: "Create" },
    {
      icon: (
        <Avatar className='h-6 w-6'>
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback><User className="w-5 h-5 text-gray-500" /></AvatarFallback>
        </Avatar>
      ), text: "Profile"
    },
    { icon: <LogOut />, text: "Logout" },
  ]

  const SidebarContent = () => (
    <div className='flex flex-col h-full'>
      <h1 className='my-8 pl-3 font-bold text-xl'>Flik</h1>
      <div className='flex-1'>
        {
          sidebarItems.map((item, index) => {
            return (
              <div onClick={() => sidebarHandler(item.text)} key={index} className='flex items-center gap-4 relative hover:bg-gray-100 hover:text-slate-900 dark:hover:text-black rounded-lg p-3 my-3 cursor-pointer'>
                {item.icon}
                <span>{item.text}</span>
              </div>
            )
          })
        }
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Top Navigation */}
      <div className='md:hidden fixed top-0 left-0 w-full bg-white border-b border-gray-300 p-4 flex items-center justify-between z-40'>
        <h1 className='font-bold text-xl'>Flik</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Menu className='cursor-pointer' />
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-4">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Left Sidebar */}
      <div className='hidden md:flex fixed top-0 left-0 px-4 border-r border-gray-300 w-[16%] lg:w-[18%] h-screen z-10 bg-white'>
        <SidebarContent />
      </div>

      <CreatePost open={open} setOpen={setOpen} />
      <Notifications open={openNotifications} setOpen={setOpenNotifications} />
    </>
  )
}

export default LeftSidebar;

import React, { useState } from 'react'
import { Home, Search, Heart, TrendingUp, MessageCircle, PlusSquare, LogOut, } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { data, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import { setAuthUser } from '@/redux/authSlice'
import CreatePost from './CreatePost'
import { setPosts, setSelectedPost } from '@/redux/postSlice'


const LeftSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);
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
  const createPostHandler = () => {
    setOpen(true);
  }
  const sidebarHandler = (textType) => {
    if (textType === 'Logout') {
      logoutHandler();
    } else if (textType === 'Create') {
      setOpen(true);
    } else if (textType === "Home") {
      navigate("/");
    } else if (textType === "Messages") {
      navigate("/chat");
    } else if (textType === "Explore") {
      navigate("/explore");
    } else if (textType === "Profile") {
      navigate(`/profile/${user?._id}`);
    }
  }
  const sidebarItems = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Explore" },
    { icon: <MessageCircle />, text: "Messages" },
    { icon: <Heart />, text: "Notifications" },
    { icon: <PlusSquare />, text: "Create" },
    {
      icon: (
        <Avatar className='h-6 w-6'>
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ), text: "Profile"
    },
    { icon: <LogOut />, text: "Logout" },
  ]
  return (
    <div className='fixed top-0 z-10 left-0 px-4 border-r border-gray-300 w-[16%] h-screen'>
      <div className='flex flex-col '>
        <h1 className='my-8 pl-3 font-bold text-xl'>LOGO</h1>
        <div>
          {
            sidebarItems.map((item, index) => {
              return (
                <div onClick={() => sidebarHandler(item.text)} key={index} className='flex items-center gap-4 relative hover:bg-gray-100 rounded-lg p-3 my-3 cursor-pointer'>
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              )
            })
          }
        </div>
      </div>
      <CreatePost open={open} setOpen={setOpen} />
      
    </div>
  )
}

export default LeftSidebar
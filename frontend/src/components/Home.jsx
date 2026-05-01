import React from 'react'
import Feed from './Feed'
import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'
import useGetAllPost from '@/Hooks/useGetAllPost'
import useGetSuggestedUsers from '@/Hooks/useGetSuggestedUsers'

const Home = () => {
  useGetAllPost();
  useGetSuggestedUsers();
  return (
    <div className='flex'>
      <div className="grow">
        <Feed />
        <Outlet />
      </div>
      <RightSidebar />
    </div>
  )
}

export default Home
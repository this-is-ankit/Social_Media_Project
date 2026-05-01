import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSidebar from './LeftSidebar'

const MainLayout = () => {
    return (
        <div className='flex flex-col md:flex-row'>
            <LeftSidebar/>
            <div className='flex-1 pt-16 md:pt-0 md:ml-[16%] lg:ml-[18%]'>
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout
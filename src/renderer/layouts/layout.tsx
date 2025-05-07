import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import LeftSidebar from '../components/LeftSidebar'

const Layout = () => {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Navbar />
      <div className="m-6">
      <div className="flex h-[80vh]">
        <LeftSidebar />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
      </div>
    </div>
  )
}

export default Layout

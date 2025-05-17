import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import LeftSidebar from '../components/LeftSidebar'
import MainContainer from '../components/MainContainer'
import PlaySong from '@/components/PlaySong'

const Layout = () => {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Navbar />
      <div className="mx-6">
        <div className="flex gap-4 h-[80vh]">
          <LeftSidebar />
          <MainContainer>
            <Outlet />
          </MainContainer>
          
        </div>
      </div>
      <PlaySong />
    </div>
  )
}

export default Layout

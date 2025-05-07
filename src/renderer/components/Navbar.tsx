import React from 'react'

const Navbar = () => {
  return (
    <nav className='h-[10vh] bg-[#000000] flex justify-between items-center px-8'>

      <div className="left flex items-center gap-6">
        <i className="bi bi-three-dots text-[#FFFFFF] text-4xl cursor-pointer hover:text-slate-100"></i>
        <div className="flex items-center text-3xl">
          <i className="bi bi-chevron-left text-[#363636]"></i>
          <i className="bi bi-chevron-right text-[#363636]"></i>
        </div>
        <i className="bi bi-house-door-fill text-3xl text-white bg-[#1F1F1F] p-3 rounded-full inline-flex"></i>

        <div className="w-[36rem] h-[7vh] bg-[#1F1F1F] hover:outline-[0.1px] outline-[#242424] hover:bg-[#222222] rounded-4xl overflow-hidden flex items-center">

          <div className="w-[10%] h-full text-[#B1B1B1] flex-f">
            <i className="bi bi-search text-3xl cursor-pointer"></i>
          </div>
          <div className="w-[80%] h-full flex items-center">
            <input className='w-full py-1 px-2 border-r border-[#B1B1B1] outline-none text-[20px] text-white tracking-wide' type="text" placeholder='What do you want to play?' />
          </div>
          <div className="w-[10%] h-full text-[#B1B1B1] flex-f">
            <i className="bi bi-layout-wtf text-xl cursor-pointer"></i>
          </div>
        </div>

      </div>
      <div className="right flex items-center gap-10">
        <div className="flex items-center gap-6">
          <button className='bg-white w-[12rem] shadow-sm hover:shadow-slate-50 transition-all ease cursor-pointer font-bold text-xl h-[3rem] rounded-3xl blur-[0.6px]'>Explore Premium</button>
          <i className="bi bi-bell text-3xl cursor-pointer text-[#B1B1B1]"></i>
          <i className="bi bi-people text-3xl cursor-pointer text-[#B1B1B1]"></i>
          <div className="bg-[#1F1F1F] h-14 w-14 p-2 rounded-full flex-f">
            <div className="w-full h-full bg-[#FF6437] rounded-full flex-f uppercase font-bold text-xl">h</div>
          </div>
        </div>

        <div className="flex-f gap-10 text-white">
          <i className="bi bi-dash text-3xl cursor-pointer text-white" onClick={() => window.electronAPI.minimizeWindow()}></i>
          <i className="bi bi-x text-3xl cursor-pointer text-white rounded-full hover:bg-red-500" onClick={() => window.electronAPI.closeWindow()}></i>

        </div>

      </div>
    </nav>
  )
}

export default Navbar
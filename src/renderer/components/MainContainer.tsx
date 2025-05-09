import React from 'react'

const MainContainer = ({ children }) => {
  return (
    <div className="flex-1 overflow-auto bg-[#121212] p-4 text-white rounded-lg">
      {children}
    </div>
  )
}

export default MainContainer

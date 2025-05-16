import React from 'react';
import CustomScrollbar from './CustomScrollbar';

const MainContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-[80vh] relative w-full bg-[#121212] text-white rounded-lg">
    <CustomScrollbar> 
      {children}
    </CustomScrollbar > 

    </div>
  );
};

export default MainContainer;
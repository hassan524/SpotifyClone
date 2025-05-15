import React from 'react';

const MainContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-[80vh] w-full bg-[#121212] text-white rounded-lg overflow-y-scroll">
      {children}
    </div>
  );
};

export default MainContainer;
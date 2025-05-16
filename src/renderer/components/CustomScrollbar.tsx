import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

const CustomScrollbar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Scrollbars
      autoHide
      style={{ height: '100%' }} 
      renderTrackVertical={({ style, ...props }) => (
        <div
          {...props}
          style={{
            ...style,
            width: '1rem',
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: 'transparent',
          }}
        />
      )}
 renderThumbVertical={({ style, ...props }) => (
  <div
    {...props}
    style={{
      ...style,
      backgroundColor: 'rgba(85, 85, 85, 0.4)', // dark gray with 40% opacity
    }}
  />
)}

    >
      {children}
    </Scrollbars>
  );
};

export default CustomScrollbar;

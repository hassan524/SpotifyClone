import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

const CustomScrollbar = ({ children }) => {
  return (
    <Scrollbars
      autoHide
      renderTrackVertical={({ style, ...props }) => (
        <div
          {...props}
          style={{
            ...style,
            width: '1.1rem',
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: '#2a2a2a',
          }}
        />
      )}
      renderThumbVertical={({ style, ...props }) => (
        <div
          {...props}
          style={{
            ...style,
            backgroundColor: '#555',
            borderRadius: '6px',
            // minHeight: '30px',  // 👈 this limits how tall the thumb *can be*
            // maxHeight: '40px',  // 👈 optional: limit it further
          }}
        />
      )}
    >
      {children}
    </Scrollbars>
  );
};

export default CustomScrollbar;

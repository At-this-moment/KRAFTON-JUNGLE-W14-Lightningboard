import React from 'react';

const VideoBackground = ({ children }) => {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      <video autoPlay loop muted style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        top: 0,
        left: 0,
        zIndex: -1
      }}>
        <source src="/lightning.mp4" type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

export default VideoBackground;

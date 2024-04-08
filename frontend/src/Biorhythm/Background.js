import React from 'react';
import video from '../assets/Vid.mp4';
import '../Style.css';

const BackgroundVideo = () => {
  return (
    <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover z-0">
      <source src={video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default BackgroundVideo;
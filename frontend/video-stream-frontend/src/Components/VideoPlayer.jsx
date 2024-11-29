import React, { useRef, useEffect } from 'react';

const VideoPlayer = ({ videoId }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute('src');
      videoRef.current.load();
    }
  }, [videoId]);

  return (
    <div className="video-container">
      <video ref={videoRef} width="100%" controls autoPlay>
        <source
          src={`http://localhost:3000/videos/${videoId}`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;

import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import VideoPlayer from './Components/VideoPlayer';

function App() {
  const [videoId, setVideoId] = useState(null);
  const [category, setCategory] = useState('');

  const videoCategories = {
    'Construction': ['construction1', 'construction2', 'construction3'],
    'Food': ['food1', 'food2', 'food3'],
    'Technology': ['technical1', 'technical2', 'technical3'],
    'Textiles': ['textile1', 'textile2', 'textile3'],
    'Transport': ['transport1', 'transport2', 'transport3']
  };

  const playVideo = (videoId) => {
    setVideoId(videoId);
  };

  const chooseCategory = (category) => {
    setCategory(category);
    setVideoId(null);  // Reset video when category is changed
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Video Learning Hub</h1>
        <div className="category-buttons">
          {Object.keys(videoCategories).map((category) => (
            <button
              key={category}
              className="category-button"
              onClick={() => chooseCategory(category)}
            >
              Learn {category}
            </button>
          ))}
        </div>
        <div className="video-list">
          {category && !videoId && (
            <div className="video-options">
              {videoCategories[category].map((videoId) => (
                <button
                  key={videoId}
                  className="video-button"
                  onClick={() => playVideo(videoId)}
                >
                  Play {videoId.replace(/([a-z])([A-Z])/g, '$1 $2')}
                </button>
              ))}
            </div>
          )}
        </div>
        {videoId && <VideoPlayer videoId={videoId} />}
      </header>
    </div>
  );
}

export default App;

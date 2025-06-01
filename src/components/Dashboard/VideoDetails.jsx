import React from 'react';
import './VideoDetails.css';

const VideoDetails = ({ video, onClose }) => {
  return (
    <div className="details-overlay">
      <div className="details-container">
        <div className="details-header">
          <h2>Video Details</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="details-content">
          <div className="video-player">
            <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
            <div className="video-duration">{video.duration}</div>
            <button className="play-btn">▶️ Play</button>
          </div>

          <div className="video-info">
            <div className="video-header">
              <h3>{video.title}</h3>
              <div className="video-meta">
                <span className="video-date">{new Date(video.date).toLocaleDateString()}</span>
                <span className="video-duration-label">Duration: {video.duration}</span>
              </div>
            </div>

            <div className="video-description">
              <h4>Description</h4>
              <p>{video.description}</p>
            </div>

            <div className="video-stats">
              <div className="stat-item">
                <span className="stat-label">Views</span>
                <span className="stat-value">👁️ {video.views}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Likes</span>
                <span className="stat-value">❤️ {video.likes}</span>
              </div>
            </div>

            <div className="video-actions">
              <button className="action-btn delete">Delete Video</button>
              <button className="action-btn report">Report Video</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails; 
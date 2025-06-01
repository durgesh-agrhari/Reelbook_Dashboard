import React from 'react';
import './StoryDetails.css';

const StoryDetails = ({ story, onClose }) => {
  return (
    <div className="details-overlay">
      <div className="details-container">
        <div className="details-header">
          <h2>Story Details</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="details-content">
          <div className="story-display">
            <img src={story.image} alt="Story" className="story-image" />
            <div className="story-duration">{story.duration}</div>
          </div>

          <div className="story-info">
            <div className="story-header">
              <div className="story-meta">
                <span className="story-date">{new Date(story.date).toLocaleDateString()}</span>
                <span className="story-duration-label">Duration: {story.duration}</span>
              </div>
              <div className="story-stats">
                <span>👁️ {story.views} views</span>
              </div>
            </div>

            <div className="story-actions">
              <button className="action-btn delete">Delete Story</button>
              <button className="action-btn report">Report Story</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetails; 
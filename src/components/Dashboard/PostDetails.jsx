import React from 'react';
import './PostDetails.css';

const PostDetails = ({ post, onClose }) => {
  return (
    <div className="details-overlay">
      <div className="details-container">
        <div className="details-header">
          <h2>Post Details</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="details-content">
          <div className="post-display">
            <img src={post.image} alt="Post" className="post-image" />
          </div>

          <div className="post-info">
            <div className="post-header">
              <div className="post-meta">
                <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
                <span className="post-type">{post.type}</span>
              </div>
              <div className="post-stats">
                <span>👁️ {post.views} views</span>
                <span>❤️ {post.likes} likes</span>
                <span>💬 {post.comments} comments</span>
              </div>
            </div>

            <div className="post-description">
              <h3>Description</h3>
              <p>{post.description}</p>
            </div>

            <div className="post-actions">
              <button className="action-btn delete">Delete Post</button>
              <button className="action-btn report">Report Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails; 
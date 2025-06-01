import React, { useState } from 'react';
import './UserDetails.css';

const UserDetails = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState('profile');

  const stats = {
    posts: 42,
    videos: 15,
    stories: 28,
    followers: 1250,
    following: 350,
    likes: 8750
  };

  const recentContent = {
    posts: [
      { 
        id: 1, 
        image: 'https://img.freepik.com/free-photo/morskie-oko-tatry_1204-510.jpg?semt=ais_items_boosted&w=740', 
        caption: 'Beautiful sunset at the beach! 🌅', 
        likes: 245, 
        comments: 23,
        date: '2024-03-15',
        location: 'Miami Beach, FL'
      },
      { 
        id: 2, 
        image: 'https://img.freepik.com/free-photo/morskie-oko-tatry_1204-510.jpg?semt=ais_items_boosted&w=740', 
        caption: 'City life vibes ✨', 
        likes: 189, 
        comments: 15,
        date: '2024-03-14',
        location: 'New York City'
      },
    ],
    videos: [
      { 
        id: 1, 
        thumbnail: 'https://img.freepik.com/free-photo/morskie-oko-tatry_1204-510.jpg?semt=ais_items_boosted&w=740', 
        title: 'Travel vlog: Exploring Tokyo', 
        description: 'Join me on this amazing journey through Tokyo\'s hidden gems!',
        views: 1250, 
        likes: 89,
        duration: '15:30',
        date: '2024-03-13'
      },
      { 
        id: 2, 
        thumbnail: 'https://img.freepik.com/free-photo/morskie-oko-tatry_1204-510.jpg?semt=ais_items_boosted&w=740', 
        title: 'Cooking tutorial: Italian Pasta', 
        description: 'Learn how to make authentic Italian pasta from scratch!',
        views: 890, 
        likes: 45,
        duration: '08:45',
        date: '2024-03-12'
      },
    ],
    stories: [
      { 
        id: 1, 
        image: 'https://onetreeplanted.org/cdn/shop/articles/nature_facts_1600x.jpg?v=1705008496', 
        views: 320,
        date: '2024-03-15',
        duration: '24h'
      },
      { 
        id: 2, 
        image: 'https://onetreeplanted.org/cdn/shop/articles/nature_facts_1600x.jpg?v=1705008496', 
        views: 280,
        date: '2024-03-14',
        duration: '24h'
      },
    ]
  };

  return (
    <div className="user-details-overlay">
      <div className="user-details-container">
        <div className="user-details-header">
          <h2>User Details</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="user-profile-header">
          <div className="user-avatar">
            <img src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg" alt={user.username} />
          </div>
          <div className="user-info">
            <h3>{user.username}</h3>
            <p>{user.email}</p>
            <div className="user-stats">
              <div className="stat-item">
                <span className="stat-value">{stats.posts}</span>
                <span className="stat-label">Posts</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.videos}</span>
                <span className="stat-label">Videos</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.stories}</span>
                <span className="stat-label">Stories</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.followers}</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.following}</span>
                <span className="stat-label">Following</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{stats.likes}</span>
                <span className="stat-label">Total Likes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="user-details-tabs">
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button 
            className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </button>
          <button 
            className={`tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveTab('videos')}
          >
            Videos
          </button>
          <button 
            className={`tab-btn ${activeTab === 'stories' ? 'active' : ''}`}
            onClick={() => setActiveTab('stories')}
          >
            Stories
          </button>
        </div>

        <div className="user-details-content">
          {activeTab === 'profile' && (
            <div className="profile-info">
              <div className="info-group">
                <label>Full Name</label>
                <p>{user.fullName}</p>
              </div>
              <div className="info-group">
                <label>Email</label>
                <p>{user.email}</p>
              </div>
              <div className="info-group">
                <label>Phone</label>
                <p>{user.phone || 'Not provided'}</p>
              </div>
              <div className="info-group">
                <label>Location</label>
                <p>{user.location || 'Not provided'}</p>
              </div>
              <div className="info-group">
                <label>Bio</label>
                <p>{user.bio || 'No bio provided'}</p>
              </div>
              <div className="info-group">
                <label>Joined Date</label>
                <p>{new Date(user.joinDate).toLocaleDateString()}</p>
              </div>
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="content-grid">
              {recentContent.posts.map(post => (
                <div key={post.id} className="content-item post-item">
                  <div className="content-header">
                    <span className="content-date">{new Date(post.date).toLocaleDateString()}</span>
                    <span className="content-location">{post.location}</span>
                  </div>
                  <img src={post.image} alt={post.caption} />
                  <div className="content-info">
                    <p className="content-caption">{post.caption}</p>
                    <div className="content-stats">
                      <span>❤️ {post.likes}</span>
                      <span>💬 {post.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="content-grid">
              {recentContent.videos.map(video => (
                <div key={video.id} className="content-item video-item">
                  <div className="video-thumbnail">
                    <img src={video.thumbnail} alt={video.title} />
                    <span className="video-duration">{video.duration}</span>
                  </div>
                  <div className="content-info">
                    <h4 className="video-title">{video.title}</h4>
                    <p className="video-description">{video.description}</p>
                    <div className="content-stats">
                      <span>👁️ {video.views}</span>
                      <span>❤️ {video.likes}</span>
                      <span>📅 {new Date(video.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'stories' && (
            <div className="content-grid">
              {recentContent.stories.map(story => (
                <div key={story.id} className="content-item story-item">
                  <div className="story-thumbnail">
                    <img src={story.image} alt="Story" />
                    <span className="story-duration">{story.duration}</span>
                  </div>
                  <div className="content-info">
                    <div className="content-stats">
                      <span>👁️ {story.views}</span>
                      <span>📅 {new Date(story.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails; 
import React, { useState, useEffect } from 'react';
import './StoriesSection.css';

const StoriesSection = () => {
  const [stories, setStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://reelbook-cgarbbexgdd5a5dn.canadacentral-01.azurewebsites.net/story/getallStorys');
      if (!response.ok) {
        throw new Error('Failed to fetch stories');
      }
      const data = await response.json();
      setStories(data.data.map(story => ({
        id: story._id,
        title: story.caption || 'Untitled Story',
        image: story.imageurl || 'https://via.placeholder.com/150',
        duration: story.duration || '24h',
        views: story.views || 0, 
        likes: story.likes?.length || 0,
        date: story.createdAt || new Date().toISOString(),
        status: story.isReported ? 'reported' : 'active',
        description: story.description || ''
      })));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (storyId) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      try {
        // Add your delete API endpoint here
        setStories(stories.filter(story => story.id !== storyId));
      } catch (err) {
        console.error('Error deleting story:', err);
        alert('Failed to delete story');
      }
    }
  };

  const handleReport = async (storyId) => {
    try {
      // Add your report API endpoint here
      setStories(stories.map(story => 
        story.id === storyId 
          ? { ...story, status: story.status === 'active' ? 'reported' : 'active' }
          : story
      ));
    } catch (err) {
      console.error('Error reporting story:', err);
      alert('Failed to report story');
    }
  };

  const filteredStories = stories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || story.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div className="loading">Loading stories...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="stories-section">
      <div className="section-header">
        <h2>Stories</h2>
        <div className="search-filter">
          <input 
            type="text" 
            placeholder="Search stories..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Stories</option>
            <option value="reported">Reported</option>
            <option value="active">Active</option>
          </select>
        </div>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Duration</th>
              <th>Views</th>
              <th>Likes</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStories.map(story => (
              <tr key={story.id}>
                <td>
                  <div className="story-title-cell" onClick={() => setSelectedStory(story)}>
                    <img src={story.image} alt={story.title} className="thumbnail-preview" />
                    <span>{story.title}</span>
                  </div>
                </td>
                <td>{story.duration}</td>
                <td>👁️ {story.views}</td>
                <td>❤️ {story.likes}</td>
                <td>{new Date(story.date).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${story.status}`}>
                    {story.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDelete(story.id)}
                    >
                      Delete
                    </button>
                    <button 
                      className={`action-btn ${story.status === 'active' ? 'report' : 'unreport'}`}
                      onClick={() => handleReport(story.id)}
                    >
                      {story.status === 'active' ? 'Report' : 'Unreport'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedStory && (
        <div className="story-details-modal">
          <div className="story-details-content">
            <button className="close-button" onClick={() => setSelectedStory(null)}>×</button>
            <h3>{selectedStory.title}</h3>
            <img src={selectedStory.image} alt={selectedStory.title} className="story-detail-image" />
            <div className="story-stats">
              <div className="stat-item">
                <span className="stat-label">Views</span>
                <span className="stat-value">{selectedStory.views}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Likes</span>
                <span className="stat-value">{selectedStory.likes}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Duration</span>
                <span className="stat-value">{selectedStory.duration}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Posted</span>
                <span className="stat-value">{new Date(selectedStory.date).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="story-description">
              <h4>Description</h4>
              <p>{selectedStory.description || 'No description available'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoriesSection; 
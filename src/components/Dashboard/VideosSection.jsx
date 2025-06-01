import React, { useState, useEffect } from 'react';
import VideoDetails from './VideoDetails';
import './VideosSection.css';

const VideosSection = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://reelbook-cgarbbexgdd5a5dn.canadacentral-01.azurewebsites.net/reel/getallReels');
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      const data = await response.json();
      setVideos(data.data.map(video => ({
        id: video._id,
        title: video.caption || 'Untitled Video',
        thumbnail: video.thumbnillurl || 'https://via.placeholder.com/150',
        duration: video.duration || '0:00',
        views: video.views || 0,
        likes: video.likes.length || 0,
        date: video.createdAt || new Date().toISOString(),
        status: video.isReported ? 'reported' : 'active',
        description: video.description || ''
      })));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (videoId) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        // Add your delete API endpoint here
        // const response = await fetch(`YOUR_DELETE_API_ENDPOINT/${videoId}`, {
        //   method: 'DELETE'
        // });
        // if (!response.ok) throw new Error('Failed to delete video');
        
        setVideos(videos.filter(video => video.id !== videoId));
      } catch (err) {
        console.error('Error deleting video:', err);
        alert('Failed to delete video');
      }
    }
  };

  const handleReport = async (videoId) => {
    try {
      // Add your report API endpoint here
      // const response = await fetch(`YOUR_REPORT_API_ENDPOINT/${videoId}`, {
      //   method: 'POST'
      // });
      // if (!response.ok) throw new Error('Failed to report video');
      
      setVideos(videos.map(video => 
        video.id === videoId 
          ? { ...video, status: video.status === 'active' ? 'reported' : 'active' }
          : video
      ));
    } catch (err) {
      console.error('Error reporting video:', err);
      alert('Failed to report video');
    }
  };

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || video.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div className="loading">Loading videos...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="videos-section">
      <div className="section-header">
        <h2>Videos</h2>
        <div className="search-filter">
          <input 
            type="text" 
            placeholder="Search videos..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Videos</option>
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
            {filteredVideos.map(video => (
              <tr key={video.id}>
                <td>
                  <div className="video-title-cell" onClick={() => setSelectedVideo(video)}>
                    <img src={video.thumbnail} alt={video.title} className="thumbnail-preview" />
                    <span>{video.title}</span>
                  </div>
                </td>
                <td>{video.duration}</td>
                <td>👁️ {video.views}</td>
                <td>❤️ {video.likes}</td>
                <td>{new Date(video.date).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${video.status}`}>
                    {video.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDelete(video.id)}
                    >
                      Delete
                    </button>
                    <button 
                      className={`action-btn ${video.status === 'active' ? 'report' : 'unreport'}`}
                      onClick={() => handleReport(video.id)}
                    >
                      {video.status === 'active' ? 'Report' : 'Unreport'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedVideo && (
        <VideoDetails 
          video={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
        />
      )}
    </div>
  );
};

export default VideosSection; 
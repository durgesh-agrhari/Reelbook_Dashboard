import React, { useState, useEffect } from 'react';
import './SummarySection.css';

const SummarySection = () => {
  const [summaryData, setSummaryData] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalVideos: 0,
    totalStories: 0,
    reportedContent: 0,
    reportedUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSummaryData();
  }, []);

  const fetchSummaryData = async () => {
    try {
      setLoading(true);
      
      // Fetch users
      const usersResponse = await fetch('https://reelbook-cgarbbexgdd5a5dn.canadacentral-01.azurewebsites.net/getallUser');
      const usersData = await usersResponse.json();
      
      // Fetch posts
      const postsResponse = await fetch('https://reelbook-cgarbbexgdd5a5dn.canadacentral-01.azurewebsites.net/post/getallPosts');
      const postsData = await postsResponse.json();
      
      // Fetch videos
      const videosResponse = await fetch('https://reelbook-cgarbbexgdd5a5dn.canadacentral-01.azurewebsites.net/reel/getallReels');
      const videosData = await videosResponse.json();
      
      // Fetch stories
      const storiesResponse = await fetch('https://reelbook-cgarbbexgdd5a5dn.canadacentral-01.azurewebsites.net/story/getallStorys');
      const storiesData = await storiesResponse.json();

      // Calculate reported content
      const reportedPosts = postsData.data.filter(post => post.isReported).length;
      const reportedVideos = videosData.data.filter(video => video.isReported).length;
      const reportedStories = storiesData.data.filter(story => story.isReported).length;
      const reportedUsers = usersData.data.filter(user => user.isReported).length;

      setSummaryData({
        totalUsers: usersData.data.length,
        totalPosts: postsData.data.length,
        totalVideos: videosData.data.length,
        totalStories: storiesData.data.length,
        reportedContent: reportedPosts + reportedVideos + reportedStories,
        reportedUsers: reportedUsers
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: 'Total Users',
      value: summaryData.totalUsers,
      icon: '👥',
      color: '#1976d2'
    },
    {
      title: 'Total Posts',
      value: summaryData.totalPosts,
      icon: '📝',
      color: '#2e7d32'
    },
    {
      title: 'Total Videos',
      value: summaryData.totalVideos,
      icon: '🎥',
      color: '#c2185b'
    },
    {
      title: 'Total Stories',
      value: summaryData.totalStories,
      icon: '📱',
      color: '#f57c00'
    },
    {
      title: 'Reported Content',
      value: summaryData.reportedContent,
      icon: '⚠️',
      color: '#d32f2f'
    },
    {
      title: 'Reported Users',
      value: summaryData.reportedUsers,
      icon: '🚫',
      color: '#7b1fa2'
    }
  ];

  if (loading) {
    return <div className="loading">Loading summary data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="summary-section">
      <div className="section-header">
        <h2>Dashboard Summary</h2>
      </div>
      <div className="summary-grid">
        {cards.map((card, index) => (
          <div 
            key={index} 
            className="summary-card"
            style={{ borderColor: card.color }}
          >
            <div className="card-icon" style={{ color: card.color }}>
              {card.icon}
            </div>
            <div className="card-content">
              <h3>{card.title}</h3>
              <p className="card-value" style={{ color: card.color }}>
                {card.value.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummarySection; 
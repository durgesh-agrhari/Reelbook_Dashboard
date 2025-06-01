import React, { useState } from 'react';
import './ReportedSection.css';

const ReportedSection = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [reportedItems, setReportedItems] = useState([
    {
      id: 1,
      type: 'video',
      title: 'Summer Vacation',
      thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      reportedBy: 'user123',
      reportDate: '2024-03-15',
      reason: 'Inappropriate content',
      status: 'pending',
      content: {
        duration: '2:30',
        views: 1200,
        likes: 450,
        description: 'Beautiful summer vacation memories at the beach.'
      }
    },
    {
      id: 2,
      type: 'post',
      title: 'City Life',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df',
      reportedBy: 'user456',
      reportDate: '2024-03-14',
      reason: 'Spam',
      status: 'resolved',
      content: {
        likes: 280,
        comments: 32,
        description: 'The vibrant city streets at night.'
      }
    },
    {
      id: 3,
      type: 'story',
      title: 'Morning Coffee',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
      reportedBy: 'user789',
      reportDate: '2024-03-13',
      reason: 'Harassment',
      status: 'pending',
      content: {
        views: 850,
        likes: 320,
        duration: '24h',
        description: 'Starting the day with a perfect cup of coffee.'
      }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const handleResolve = (itemId) => {
    setReportedItems(reportedItems.map(item => 
      item.id === itemId 
        ? { ...item, status: 'resolved' }
        : item
    ));
  };

  const handleDelete = (itemId) => {
    if (window.confirm('Are you sure you want to delete this reported content?')) {
      setReportedItems(reportedItems.filter(item => item.id !== itemId));
    }
  };

  const filteredItems = reportedItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !typeFilter || item.type === typeFilter;
    const matchesStatus = !statusFilter || item.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const renderContentDetails = (content) => {
    switch (content.type) {
      case 'video':
        return (
          <div className="content-details">
            <div className="content-preview">
              <img src={content.thumbnail} alt={content.title} />
              <div className="content-duration">{content.content.duration}</div>
            </div>
            <div className="content-info">
              <h3>{content.title}</h3>
              <p>{content.content.description}</p>
              <div className="content-stats">
                <span>👁️ {content.content.views} views</span>
                <span>❤️ {content.content.likes} likes</span>
              </div>
            </div>
          </div>
        );
      case 'post':
        return (
          <div className="content-details">
            <div className="content-preview">
              <img src={content.image} alt={content.title} />
            </div>
            <div className="content-info">
              <h3>{content.title}</h3>
              <p>{content.content.description}</p>
              <div className="content-stats">
                <span>❤️ {content.content.likes} likes</span>
                <span>💬 {content.content.comments} comments</span>
              </div>
            </div>
          </div>
        );
      case 'story':
        return (
          <div className="content-details">
            <div className="content-preview">
              <img src={content.image} alt={content.title} />
              <div className="content-duration">{content.content.duration}</div>
            </div>
            <div className="content-info">
              <h3>{content.title}</h3>
              <p>{content.content.description}</p>
              <div className="content-stats">
                <span>👁️ {content.content.views} views</span>
                <span>❤️ {content.content.likes} likes</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="reported-section">
      <div className="section-header">
        <h2>Reported Content</h2>
        <div className="search-filter">
          <input 
            type="text" 
            placeholder="Search reported content..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="video">Videos</option>
            <option value="post">Posts</option>
            <option value="story">Stories</option>
          </select>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Content</th>
              <th>Type</th>
              <th>Reported By</th>
              <th>Reason</th>
              <th>Report Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr key={item.id}>
                <td>
                  <div className="content-title-cell" onClick={() => setSelectedContent(item)}>
                    <img 
                      src={item.thumbnail || item.image} 
                      alt={item.title} 
                      className="thumbnail-preview" 
                    />
                    <span>{item.title}</span>
                  </div>
                </td>
                <td>
                  <span className="type-badge">{item.type}</span>
                </td>
                <td>@{item.reportedBy}</td>
                <td>{item.reason}</td>
                <td>{new Date(item.reportDate).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${item.status}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    {item.status === 'pending' && (
                      <button 
                        className="action-btn resolve"
                        onClick={() => handleResolve(item.id)}
                      >
                        Resolve
                      </button>
                    )}
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedContent && (
        <div className="details-overlay" onClick={() => setSelectedContent(null)}>
          <div className="details-container" onClick={e => e.stopPropagation()}>
            <div className="details-header">
              <h2>Report Details</h2>
              <button className="close-btn" onClick={() => setSelectedContent(null)}>×</button>
            </div>
            <div className="details-content">
              {renderContentDetails(selectedContent)}
              <div className="report-info">
                <h3>Report Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Reported By:</span>
                    <span className="info-value">@{selectedContent.reportedBy}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Report Date:</span>
                    <span className="info-value">{new Date(selectedContent.reportDate).toLocaleDateString()}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Reason:</span>
                    <span className="info-value">{selectedContent.reason}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Status:</span>
                    <span className={`status-badge ${selectedContent.status}`}>
                      {selectedContent.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="details-actions">
                {selectedContent.status === 'pending' && (
                  <button 
                    className="action-btn resolve"
                    onClick={() => {
                      handleResolve(selectedContent.id);
                      setSelectedContent(null);
                    }}
                  >
                    Resolve Report
                  </button>
                )}
                <button 
                  className="action-btn delete"
                  onClick={() => {
                    handleDelete(selectedContent.id);
                    setSelectedContent(null);
                  }}
                >
                  Delete Content
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportedSection; 
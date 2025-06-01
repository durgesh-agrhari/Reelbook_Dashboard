import React, { useState } from 'react';
import UsersSection from './UsersSection';
import VideosSection from './VideosSection';
import PostsSection from './PostsSection';
import StoriesSection from './StoriesSection';
import ReportedSection from './ReportedSection';
import SummarySection from './SummarySection';
import './Dashboard.css';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('summary');

  const renderContent = () => {
    switch (activeSection) {
      case 'summary':
        return <SummarySection />;
      case 'users':
        return <UsersSection />;
      case 'videos':
        return <VideosSection />;
      case 'posts':
        return <PostsSection />;
      case 'stories':
        return <StoriesSection />;
      case 'reported':
        return <ReportedSection />;
      default:
        return <SummarySection />;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">
          <h3 style={{color:'white'}}>Admin Panel</h3>
          <p  style={{color:'white', fontSize:10}}>Social Media Management</p>
        </div>
        <nav className="nav-menu">
          <button 
            className={`nav-item ${activeSection === 'summary' ? 'active' : ''}`}
            onClick={() => setActiveSection('summary')}
          >
            <span className="nav-icon">📊</span>
            Dashboard
          </button>
          <button 
            className={`nav-item ${activeSection === 'users' ? 'active' : ''}`}
            onClick={() => setActiveSection('users')}
          >
            <span className="nav-icon">👥</span>
            Users
          </button>
          <button 
            className={`nav-item ${activeSection === 'videos' ? 'active' : ''}`}
            onClick={() => setActiveSection('videos')}
          >
            <span className="nav-icon">🎥</span>
            Videos
          </button>
          <button 
            className={`nav-item ${activeSection === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveSection('posts')}
          >
            <span className="nav-icon">📝</span>
            Posts
          </button>
          <button 
            className={`nav-item ${activeSection === 'stories' ? 'active' : ''}`}
            onClick={() => setActiveSection('stories')}
          >
            <span className="nav-icon">📱</span>
            Stories
          </button>
          <button 
            className={`nav-item ${activeSection === 'reported' ? 'active' : ''}`}
            onClick={() => setActiveSection('reported')}
          >
            <span className="nav-icon">⚠️</span>
            Reported Content
          </button>
        </nav>
      </div>
      <div className="main-content">
        <div className="content-header">
          <h2>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Management</h2>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard; 
import React, { useState, useEffect } from 'react';
import './PostsSection.css';

const PostsSection = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://reelbook-cgarbbexgdd5a5dn.canadacentral-01.azurewebsites.net/post/getallPosts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      setPosts(data.data.map(post => ({
        id: post._id,
        title: post.caption || 'Untitled Post',
        image: post.imageurl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjCoUtOal33JWLqals1Wq7p6GGCnr3o-lwpQ&s',
        description: post.description || '',
        likes: post.likes.length || 0,
        comments: post.comments.length || 0,
        date: post.createdAt || new Date().toISOString(),
        status: post.isReported ? 'reported' : 'active'
      })));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        // Add your delete API endpoint here
        // const response = await fetch(`YOUR_DELETE_API_ENDPOINT/${postId}`, {
        //   method: 'DELETE'
        // });
        // if (!response.ok) throw new Error('Failed to delete post');
        
        setPosts(posts.filter(post => post.id !== postId));
      } catch (err) {
        console.error('Error deleting post:', err);
        alert('Failed to delete post');
      }
    }
  };

  const handleReport = async (postId) => {
    try {
      // Add your report API endpoint here
      // const response = await fetch(`YOUR_REPORT_API_ENDPOINT/${postId}`, {
      //   method: 'POST'
      // });
      // if (!response.ok) throw new Error('Failed to report post');
      
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, status: post.status === 'active' ? 'reported' : 'active' }
          : post
      ));
    } catch (err) {
      console.error('Error reporting post:', err);
      alert('Failed to report post');
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="posts-section">
      <div className="section-header">
        <h2>Posts</h2>
        <div className="search-filter">
          <input 
            type="text" 
            placeholder="Search posts..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Posts</option>
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
              <th>Likes</th>
              <th>Comments</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map(post => (
              <tr key={post.id}>
                <td>
                  <div className="post-title-cell" onClick={() => setSelectedPost(post)}>
                    <img src={post.image} alt={post.title} className="thumbnail-preview" />
                    <div className="post-info">
                      <span className="post-title">{post.title}</span>
                      <span className="post-description">{post.description}</span>
                    </div>
                  </div>
                </td>
                <td>❤️ {post.likes}</td>
                <td>💬 {post.comments}</td>
                <td>{new Date(post.date).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${post.status}`}>
                    {post.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </button>
                    <button 
                      className={`action-btn ${post.status === 'active' ? 'report' : 'unreport'}`}
                      onClick={() => handleReport(post.id)}
                    >
                      {post.status === 'active' ? 'Report' : 'Unreport'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedPost && (
        <div className="post-details-modal">
          <div className="post-details-content">
            <button className="close-button" onClick={() => setSelectedPost(null)}>×</button>
            <h3>{selectedPost.title}</h3>
            <img src={selectedPost.image} alt={selectedPost.title} className="post-detail-image" />
            <div className="post-stats">
              <p>Likes: {selectedPost.likes}</p>
              <p>Comments: {selectedPost.comments}</p>
              <p>Posted: {new Date(selectedPost.date).toLocaleDateString()}</p>
            </div>
            <p className="post-description">{selectedPost.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsSection; 
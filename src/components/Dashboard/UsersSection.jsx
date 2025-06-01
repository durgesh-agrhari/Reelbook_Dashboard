import React, { useState, useEffect } from 'react';
import './UsersSection.css';

const UsersSection = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://reelbook-cgarbbexgdd5a5dn.canadacentral-01.azurewebsites.net/getallUser');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      console.log("data",data)
      setUsers(data.data.map(user => ({
        id: user._id,
        name: user.name || 'Unknown User',
        email: user.email || '',
        avatar: user.profilePic || 'https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg',
        joinDate: user.createdAt || new Date().toISOString(),
        status: user.isReported ? 'reported' : 'active',
        posts: user.posts.length || 0,
        followers: user.followers.length || 0
      })));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        // Add your delete API endpoint here
        // const response = await fetch(`YOUR_DELETE_API_ENDPOINT/${userId}`, {
        //   method: 'DELETE'
        // });
        // if (!response.ok) throw new Error('Failed to delete user');
        
        setUsers(users.filter(user => user.id !== userId));
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('Failed to delete user');
      }
    }
  };

  const handleReport = async (userId) => {
    try {
      // Add your report API endpoint here
      // const response = await fetch(`YOUR_REPORT_API_ENDPOINT/${userId}`, {
      //   method: 'POST'
      // });
      // if (!response.ok) throw new Error('Failed to report user');
      
      setUsers(users.map(user => 
        user.id === userId 
          ? { ...user, status: user.status === 'active' ? 'reported' : 'active' }
          : user
      ));
    } catch (err) {
      console.error('Error reporting user:', err);
      alert('Failed to report user');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="users-section">
      <div className="section-header">
        <h2>Users</h2>
        <div className="search-filter">
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Users</option>
            <option value="reported">Reported</option>
            <option value="active">Active</option>
          </select>
        </div>
      </div>

      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Posts</th>
              <th>Followers</th>
              <th>Join Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="user-info" onClick={() => setSelectedUser(user)}>
                    <img src={user.avatar} alt={user.name} className="user-avatar" />
                    <span style={{fontSize:10}}>{user.name}</span>
                  </div>
                </td>
                <td style={{fontSize:10}}>{user.email}</td>
                <td style={{fontSize:10}}>{user.posts}</td>
                <td style={{fontSize:10}}>{user.followers}</td>
                <td style={{fontSize:10}}>{new Date(user.joinDate).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${user.status}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                    <button 
                      className={`action-btn ${user.status === 'active' ? 'report' : 'unreport'}`}
                      onClick={() => handleReport(user.id)}
                    >
                      {user.status === 'active' ? 'Report' : 'Unreport'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="user-details-modal">
          <div className="user-details-content">
            <button className="close-button" onClick={() => setSelectedUser(null)}>×</button>
            <div className="user-profile">
              <img src={selectedUser.avatar} alt={selectedUser.name} className="user-profile-image" />
              <h3>{selectedUser.name}</h3>
              <p className="user-email">{selectedUser.email}</p>
            </div>
            <div className="user-stats">
              <div className="stat-item">
                <span className="stat-label">Posts</span>
                <span className="stat-value">{selectedUser.posts}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Followers</span>
                <span className="stat-value">{selectedUser.followers}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Join Date</span>
                <span className="stat-value">{new Date(selectedUser.joinDate).toLocaleDateString()}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Status</span>
                <span className={`stat-value status-badge ${selectedUser.status}`}>
                  {selectedUser.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersSection; 
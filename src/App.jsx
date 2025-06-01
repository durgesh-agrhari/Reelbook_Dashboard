import React, { useState } from 'react';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
// import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (success) => {
    setIsAuthenticated(success);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
};

export default App;

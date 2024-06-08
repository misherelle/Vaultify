import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome to Vaultify</h1>
      <p>Automatically track and preserve your monthly music journey.</p>
      <button onClick={handleLogin}>Sign in with Spotify</button>
    </div>
  );
};

export default Welcome;

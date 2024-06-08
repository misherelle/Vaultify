import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const clientId = "18b9ce009b314b9eb359758d436b7b2b";
const redirectUri = "http://localhost:3000/login";

const Login = () => {
  const [profile, setProfile] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  const code = new URLSearchParams(location.search).get('code');

  useEffect(() => {
    const fetchProfile = async (token) => {
      try {
        const response = await fetch('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setProfile(data);
        localStorage.setItem('profile', JSON.stringify(data));
        setIsLoggedIn(true);  // Update the login state
        navigate('/profile');   // Redirect to Profile after logging in
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const getAccessToken = async (code) => {
      const verifier = localStorage.getItem('verifier');
      const params = new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: verifier,
      });

      try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params,
        });
        const data = await response.json();
        localStorage.setItem('accessToken', data.access_token);
        fetchProfile(data.access_token);
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    if (code) {
      getAccessToken(code);
    } else {
      const savedAccessToken = localStorage.getItem('accessToken');
      const savedProfile = localStorage.getItem('profile');
      if (savedAccessToken && savedProfile) {
        setProfile(JSON.parse(savedProfile));
        setIsLoggedIn(true);  // Update the login state
        navigate('/profile');   // Redirect to Profile
      } else {
        redirectToAuthCodeFlow();
      }
    }
  }, [code, setIsLoggedIn, navigate]);

  const redirectToAuthCodeFlow = async () => {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem('verifier', verifier);

    const params = new URLSearchParams({
      client_id: clientId,
      response_type: 'code',
      redirect_uri: redirectUri,
      scope: 'user-read-private user-read-email',
      code_challenge_method: 'S256',
      code_challenge: challenge,
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
  };

  const generateCodeVerifier = (length) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  const generateCodeChallenge = (codeVerifier) => {
    const data = new TextEncoder().encode(codeVerifier);
    return window.crypto.subtle.digest('SHA-256', data).then((digest) => {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(digest)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    });
  };

  return (
    <div>
      <h1>Login to Spotify</h1>
      {profile ? (
        <div>
          <h2>Logged in as {profile.display_name}</h2>
          <p>User ID: {profile.id}</p>
          <p>Email: {profile.email}</p>
          <p>
            Spotify URI: <a href={profile.external_urls.spotify}>{profile.uri}</a>
          </p>
          <p>
            Link: <a href={profile.href}>{profile.href}</a>
          </p>
          <p>
            Profile Image: <img src={profile.images[0]?.url} alt="Profile" width="200" />
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Login;

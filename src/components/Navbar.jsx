import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png'; // Adjust the path if necessary

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <NavLink to="/profile">
          <img src={logo} alt="Logo" />
        </NavLink>
      </div>
      <ul>
        <li>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>Profile</NavLink>
        </li>
        <li>
          <NavLink to="/playlist-maker" className={({ isActive }) => (isActive ? 'active' : '')}>Playlist Maker</NavLink>
        </li>
        <li>
          <NavLink to="/vault" className={({ isActive }) => (isActive ? 'active' : '')}>Vault</NavLink>
        </li>
        <li>
          <NavLink to="/timeline" className={({ isActive }) => (isActive ? 'active' : '')}>Timeline</NavLink>
        </li>
        <li>
          <NavLink to="/chatbot" className={({ isActive }) => (isActive ? 'active' : '')}>Chatbot</NavLink>
        </li>
        <li>
          <NavLink to="/achievements" className={({ isActive }) => (isActive ? 'active' : '')}>Achievements</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

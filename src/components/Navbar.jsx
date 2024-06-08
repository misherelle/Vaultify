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
          <NavLink to="/profile" activeClassName="active">Profile</NavLink>
        </li>
        <li>
          <NavLink to="/playlist-maker" activeClassName="active">Playlist Maker</NavLink>
        </li>
        <li>
          <NavLink to="/vault" activeClassName="active">Vault</NavLink>
        </li>
        <li>
          <NavLink to="/timeline" activeClassName="active">Timeline</NavLink>
        </li>
        <li>
          <NavLink to="/chatbot" activeClassName="active">Chatbot</NavLink>
        </li>
        <li>
          <NavLink to="/achievements" activeClassName="active">Achievements</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

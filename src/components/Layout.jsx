import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import './Navbar.css';

const Layout = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="main-content">
        <div id="root">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

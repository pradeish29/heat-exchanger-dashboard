import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2>Dashboard</h2>
            <ul>
                <li>Home</li>
                <li>Fluid Stats</li>
                <li>Settings</li>
                <li>Logout</li>
            </ul>
        </div>
    );
};

export default Sidebar;

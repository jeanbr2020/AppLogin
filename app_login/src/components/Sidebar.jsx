import React, { useState } from 'react';
import './Styles/Sidebar.css'; // Para estilos

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="hamburger" onClick={toggleSidebar}>
                ☰
            </button>
            <nav className={`nav ${isOpen ? 'open' : ''}`}>
                <ul>
                    <li>Home</li>
                    <li>Profile</li>
                    <li>Settings</li>
                    <li>Logout</li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;

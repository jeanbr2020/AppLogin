import React from 'react';
import Sidebar from './components/Sidebar.jsx'; // Atualize o caminho se necessário

function Home() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className="content" style={{ marginLeft: '250px', padding: '20px' }}>
                <h2>Home Component</h2>
            </div>
        </div>
    );
}

export default Home;

import React, { useEffect, useRef, useState } from 'react';
import './Sidebar.css'; // Importe o CSS da Sidebar

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null); // Para referenciar a sidebar

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Função para detectar cliques fora da sidebar
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false); // Recolhe a sidebar se o clique for fora dela
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Adiciona o event listener apenas quando a sidebar está aberta
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      // Remove o event listener quando a sidebar está fechada
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Limpa o event listener ao desmontar o componente
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={sidebarRef} className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className="toggle-button" onClick={toggleSidebar}>
        {isOpen ? 'Close' : 'Open'} Sidebar
      </button>
      <nav className={`nav ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/tasks">Tasks</a></li>
          {/* Adicione outros links conforme necessário */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

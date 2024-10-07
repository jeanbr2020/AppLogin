import React from 'react';
import './MainPage.css';
import Sidebar from './Sidebar';
import TaskBoard from './TaskBoard';

const MainPage = () => {
  return (
    <div className="main-container">
      <Sidebar />
      <TaskBoard />
    </div>
  );
};

export default MainPage;

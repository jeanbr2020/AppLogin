// src/components/TaskBoard.jsx
import React, { useState } from 'react';
import './TaskBoard.css'; // Folha de estilo para o TaskBoard

const TaskBoard = () => {
  const [tasks, setTasks] = useState({
    created: [{ id: 1, title: 'Tarefa 1', color: '#add8e6' }],
    inProgress: [],
    completed: [],
  });

  const handleDrag = (e, task, source) => {
    e.dataTransfer.setData('task', JSON.stringify({ task, source }));
  };

  const handleDrop = (e, destination) => {
    const { task, source } = JSON.parse(e.dataTransfer.getData('task'));
    if (source !== destination) {
      setTasks((prevState) => {
        const newSource = prevState[source].filter((t) => t.id !== task.id);
        const newDestination = [...prevState[destination], task];
        return { ...prevState, [source]: newSource, [destination]: newDestination };
      });
    }
  };

  const handleColorChange = (taskId, column, newColor) => {
    setTasks((prevState) => {
      const updatedColumn = prevState[column].map((task) =>
        task.id === taskId ? { ...task, color: newColor } : task
      );
      return { ...prevState, [column]: updatedColumn };
    });
  };

  return (
    <div className="task-board">
      {['created', 'inProgress', 'completed'].map((column) => (
        <div
          key={column}
          className={`task-column ${column}`}
          onDrop={(e) => handleDrop(e, column)}
          onDragOver={(e) => e.preventDefault()}
        >
          <h3>{column === 'created' ? 'Tarefas Criadas' : column === 'inProgress' ? 'Em Andamento' : 'Concluídas'}</h3>
          {tasks[column].map((task) => (
            <div
              key={task.id}
              className="task-item"
              style={{ backgroundColor: task.color }}
              draggable
              onDragStart={(e) => handleDrag(e, task, column)}
            >
              <p>{task.title}</p>
              <input
                type="color"
                value={task.color}
                onChange={(e) => handleColorChange(task.id, column, e.target.value)}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;

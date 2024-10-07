import React from 'react';
import './TaskList.css'; // Certifique-se de criar este arquivo CSS se precisar de estilos

const TaskList = () => {
  const tasks = [
    { id: 1, title: 'Tarefa 1', status: 'Criada' },
    { id: 2, title: 'Tarefa 2', status: 'Em Andamento' },
    { id: 3, title: 'Tarefa 3', status: 'Concluída' },
  ];

  return (
    <div className="tasklist-container">
      <h2>Lista de Tarefas</h2>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={`task ${task.status.toLowerCase()}`}>
            {task.title} - <span>{task.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

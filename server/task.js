const express = require('express');
const TaskModel = require('./models/Task'); // Certifique-se de que o caminho está correto
const router = express.Router();

// Função para formatar as datas no fuso horário de São Paulo
const formatDate = (date) => {
  return new Date(date).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
};

// Rota para criar uma nova tarefa
router.post('/', async (req, res) => {
  const { title, description, status } = req.body; // Ajuste conforme necessário

  try {
    const newTask = await TaskModel.create({ title, description, status });
    res.status(201).json({ message: 'Tarefa criada com sucesso!', task: newTask });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar a tarefa.', error });
  }
});

// Rota para obter todas as tarefas
router.get('/', async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    // Formata as datas antes de enviar a resposta
    const formattedTasks = tasks.map(task => ({
      ...task._doc,
      createdAt: formatDate(task.createdAt),
      updatedAt: formatDate(task.updatedAt),
    }));
    res.json(formattedTasks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter as tarefas.', error });
  }
});

// Rota para obter uma tarefa específica
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const task = await TaskModel.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter a tarefa.', error });
  }
});

// Rota para atualizar uma tarefa
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body; // Ajuste conforme necessário

  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(id, { title, description, status }, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }
    res.json({ message: 'Tarefa atualizada com sucesso!', task: updatedTask });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar a tarefa.', error });
  }
});

// Rota para deletar uma tarefa
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await TaskModel.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Tarefa não encontrada.' });
    }
    res.json({ message: 'Tarefa deletada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar a tarefa.', error });
  }
});

module.exports = router;

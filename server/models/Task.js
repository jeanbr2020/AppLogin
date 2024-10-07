const mongoose = require('mongoose');

// Define o esquema da tarefa
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['created', 'in progress', 'completed'], // Status da tarefa
    default: 'created',
  },
}, { timestamps: true }); // Para incluir os campos createdAt e updatedAt automaticamente

// Cria o modelo a partir do esquema
const TaskModel = mongoose.model('Task', TaskSchema);

module.exports = TaskModel;

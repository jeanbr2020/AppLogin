const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const RegisterModel = require('./models/Register');

const app = express();
app.use(express.json());
app.use(cors());

// Conexão com o MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/name_db")
    .then(() => console.log("Conectado ao MongoDB. Servidor Online na porta 3001"))
    .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

// Rota para registro de usuários
app.post('/register', (req, res) => {
    RegisterModel.create(req.body)
        .then(register => res.status(201).json({
            message: 'Cadastro realizado com sucesso!',
            register
        })) // Usando 201 para recurso criado
        .catch(err => res.status(400).json({
            message: 'Erro ao registrar. Verifique os dados.',
            error: err
        })); // Mensagem de erro detalhada
});

// Rota para verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor está funcionando!');
});

// Iniciando o servidor
app.listen(3001, () => {
    console.log("Servidor online na porta 3001");
});

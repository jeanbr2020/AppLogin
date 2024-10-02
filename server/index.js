const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const RegisterModel = require('./models/Register');

const app = express();
app.use(express.json());

// Configuração de CORS
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (!origin || origin === 'http://localhost:3000' || origin === 'http://localhost:5173') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(cookieParser());
const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);

// Conexão com o MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/name_db")
    .then(() => console.log("Conectado ao MongoDB. Servidor Online na porta 3001"))
    .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

// Rota para obter o token CSRF
app.get('/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

// Rota para registro de usuários
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const csrfToken = req.csrfToken(); // Obtém o token CSRF

    RegisterModel.create({ name, email, password, csrfToken }) // Armazena o token
        .then(register => res.status(201).json({
            message: 'Cadastro realizado com sucesso!',
            register
        }))
        .catch(err => res.status(400).json({
            message: 'Erro ao registrar. Verifique os dados.',
            error: err
        }));
});

// Rota para verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor está funcionando!');
});

// Iniciando o servidor
app.listen(3001, () => {
    console.log("Servidor online na porta 3001");
});

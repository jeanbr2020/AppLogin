const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const bcrypt = require('bcrypt');

// Unifique os modelos de registro e login em um só
const UserModel = require('./models/User'); // Altere o caminho para o seu modelo unificado

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
mongoose.connect("mongodb://127.0.0.1:27017/name_db", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conectado ao MongoDB. Servidor Online na porta 3001"))
    .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

// Função para formatar as datas no fuso horário de São Paulo
const formatDate = (date) => {
  return new Date(date).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
};

// Rota para obter o token CSRF
app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Lógica para registro de usuários
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verifica se o email já está cadastrado
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria um novo usuário
    const newUser = await UserModel.create({ name, email, password: hashedPassword });

    // Formata as datas antes de enviar a resposta
    const formattedUser = {
      ...newUser._doc,
      createdAt: formatDate(newUser.createdAt),
      updatedAt: formatDate(newUser.updatedAt),
    };

    res.status(201).json({ message: 'Cadastro realizado com sucesso!', user: formattedUser });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao registrar. Verifique os dados.', error });
  }
});

// Lógica para login
app.post("/login", csrfProtection, async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca o usuário pelo e-mail
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Nenhum registro encontrado" });
    }

    // Compara a senha fornecida com o hash armazenado
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Senha incorreta" });
    }

    // Formata as datas antes de enviar a resposta
    const formattedUser = {
      ...user._doc,
      createdAt: formatDate(user.createdAt),
      updatedAt: formatDate(user.updatedAt),
    };

    // Se a senha estiver correta, sucesso no login
    res.json({ message: "Login realizado com sucesso", user: formattedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro no servidor", error: err.message });
  }
});

// Rota para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});

// Iniciando o servidor
app.listen(3001, () => {
  console.log("Servidor online na porta 3001");
});

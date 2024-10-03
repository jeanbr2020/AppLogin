const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const csurf = require('csurf');
const RegisterModel = require('./models/Register');
const LoginModel = require('./models/Login');
const bcrypt = require('bcrypt');

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

// Rota para obter o token CSRF
app.get('/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

// Lógica para registro de usuários
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await RegisterModel.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'Cadastro realizado com sucesso!', newUser });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao registrar. Verifique os dados.', error });
    }
});

// Lógica para login
app.post("/login", csrfProtection, (req, res) => {
    const { email, password } = req.body;
  
    LoginModel.findOne({ email: email })
      .then(user => {
        if (user) {
          if (user.password === password) {
            res.json({ message: "Sucesso" });
          } else {
            res.json({ message: "Senha incorreta" });
          }
        } else {
          res.json({ message: "Nenhum registro encontrado" });
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: "Erro no servidor" });
      });
  });
// Rota para verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor está funcionando!');
});

// Iniciando o servidor
app.listen(3001, () => {
    console.log("Servidor online na porta 3001");
});

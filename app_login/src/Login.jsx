import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  // Função para buscar o token CSRF
  const fetchCsrfToken = async () => {
    try {
      const response = await axios.get('http://localhost:3001/csrf-token', { withCredentials: true });
      setCsrfToken(response.data.csrfToken);
    } catch (error) {
      console.error('Erro ao buscar o token CSRF:', error);
    }
  };

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Limpa mensagens de erro antes do envio
    setSuccessMessage(''); // Limpa mensagens de sucesso antes do envio

    try {
      const result = await axios.post('http://localhost:3001/login', { email, password }, {
        headers: {
          'CSRF-Token': csrfToken,
        },
        withCredentials: true,
      });

      // Verifica a mensagem retornada do servidor
      if (result.data.message === "Login realizado com sucesso") {
        setSuccessMessage('Login realizado com sucesso!');
        navigate('/home'); // Redireciona para a página /home após login bem-sucedido
      } else {
        setErrorMessage(result.data.message); // Mensagem de erro personalizada
      }
    } catch (err) {
      if (err.response) {
        // Se houver uma resposta do servidor
        setErrorMessage(err.response.data.message || 'Ocorreu um erro ao entrar. Tente novamente.');
      } else {
        // Se não houver resposta do servidor
        setErrorMessage('Ocorreu um erro ao entrar. Tente novamente.');
      }
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 login-card">
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input 
              type="email" 
              className="form-control" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="mb-3">
            <label>Senha</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Entrar</button>

          <p className="text-center p-4">Não tem uma conta? <a href='./register'>Cadastre-se agora!</a></p>
        </form>
        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      </div>
    </div>
  );
}

export default Login;

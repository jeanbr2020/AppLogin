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

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('http://localhost:3001/csrf-token', { withCredentials: true });
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error('Erro ao buscar o token CSRF:', error);
      }
    };
    fetchCsrfToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post('http://localhost:3001/login', { email, password }, {
        headers: {
          'CSRF-Token': csrfToken,
        },
        withCredentials: true,
      });

      if (result.data.message === "Sucesso") {
        setSuccessMessage('Login realizado com sucesso!');
        navigate('/home');
      } else {
        setErrorMessage(result.data.message);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Ocorreu um erro ao entrar. Tente novamente.');
    }
  };
    
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 login-card">
        <h2 className="text-center">Login</h2>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Entrar</button>
          <p className="text-center p-4">Não tem uma conta? <a href='./register'>Cadastre-se!</a></p>
        </form>
      </div>
    </div>
  );
}

export default Login;

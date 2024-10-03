import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import './Signup.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [csrfToken, setCsrfToken] = useState('')

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    axios.post('http://localhost:3001/register', { name, email, password }, {
      headers: {
        'CSRF-Token': csrfToken,
      },
      withCredentials: true, // Garante que os cookies sejam enviados
    })
      .then(result => {
        console.log(result);
        setSuccessMessage('Cadastro realizado com sucesso!');
      })
      .catch(err => {
        console.log(err);
        setErrorMessage('Ocorreu um erro ao cadastrar. Tente novamente.');
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 signup-card">
        <h2 className="text-center">Cadastro</h2>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <button type="submit" className="btn btn-primary w-100">Cadastrar</button>

          <p className="text-center p-4" >Já tem uma conta? <a href='./login'>Entre agora!</a> </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;

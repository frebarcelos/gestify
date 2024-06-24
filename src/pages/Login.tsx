// src/components/UserLogin.tsx
import React, { useState } from 'react';
import axios from '../axiosConfig';

const UserLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      // Redirecionar para a página principal ou dashboard
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Fazer Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Login</label>
          <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <h6>Ainda não tem login? <a href='/create-user'>Criar Login</a></h6>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default UserLogin;

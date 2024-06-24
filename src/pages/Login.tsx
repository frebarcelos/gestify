import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UserLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('/auth/login', { username, password });
      const token = response.data.token;
      auth.login(token); 
      navigate('/');      
    } catch (error: any) {     
        alert(`${error.response.data}`);      
    }
  };

  return (
    <div className="container mt-5">
      <h2>Fazer Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Login</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <h6>Ainda não tem login? <a href='/create-user'>Criar Login</a></h6>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default UserLogin;

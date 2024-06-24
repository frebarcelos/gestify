import React, { useState } from 'react';
import axios from '../axiosConfig';
import { getSystemToken } from '../utils/systemAuth';

const CreateUser: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateUser = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const systemToken = await getSystemToken();
      const response = await axios.post('/users', { username, password }, {
        headers: { Authorization: `Bearer ${systemToken}` }
      });
      console.log('User created', response.data);
      // Remove o JWT do sistema (não necessário se o token expira automaticamente)
    } catch (error) {
      console.error('Error creating user', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Criar Usuário</h2>
      <form onSubmit={handleCreateUser}>
        <div className="mb-3">
          <label className="form-label">login</label>
          <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <h6>Já tem Login? <a href='/login'>fazer Login</a></h6>
        <button type="submit" className="btn btn-primary">Criar</button>
        
      </form>
    </div>
  );
};

export default CreateUser;
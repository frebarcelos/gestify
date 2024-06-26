import React, { useState } from 'react';
import axios from '../axiosConfig';
import { getSystemToken } from '../utils/systemAuth';
import { useNavigate } from 'react-router-dom';

const CreateUser: React.FC = () => {
  const [username, setUsername] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const navigate = useNavigate();

  const handleCreateUser = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const systemToken = await getSystemToken();
      const response = await axios.post('/auth/register', { username, passwordHash }, {
        headers: { Authorization: `Bearer ${systemToken}` }
      });
      alert("Usuário criado com sucesso");
      navigate('/login');
    } catch (error: any) {
      if (error.response && error.response.data) {
        alert('Erro ao criar usuário: ' + error.response.data);
      } else {
        alert('Erro ao criar usuário: ' + error.message);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Criar Usuário</h2>
      <form onSubmit={handleCreateUser}>
        <div className="mb-3">
          <label className="form-label">Login</label>
          <input type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input type="password" className="form-control" value={passwordHash} onChange={e => setPasswordHash(e.target.value)} />
        </div>
        <h6>Já tem Login? <a href='/login'>Fazer Login</a></h6>
        <button type="submit" className="btn btn-primary">Criar</button>
      </form>
    </div>
  );
};

export default CreateUser;
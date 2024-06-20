// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import CardTask from '../components/atom/cardTask';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/tasks');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      <CardTask color="btn-secondary"   />
      <ul>
      
      </ul>
    </div>
  );
};

export default Home;

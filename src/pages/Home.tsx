// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TaskList from '../components/molecules/TaskList';
import tasksData from '../data/taskexemples.json';
import Task from '../interfaces/ICardTask';
import NavBar from '../components/atom/navbar';
import { Container } from 'react-bootstrap';

const Home = () => {
const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
      setTasks(tasksData);
    }, []);


    return (
      <>
      <NavBar />
      <div className='mt-5'>
      <Container>      
        <TaskList tasks={tasks}  title="Um titulo legal" />
      </Container>      
    </div>
      </>
    
  );
};

export default Home;

// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import TaskList from '../components/molecules/TaskList';
import tasksData from '../data/taskexemples.json';
import Task from '../interfaces/ICardTask';

const Home = () => {
const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
      setTasks(tasksData);
    }, []);


  return (
    <div className='mt-5'>      
      <TaskList tasks={tasks}  title="Um titulo legal" />      
    </div>
  );
};

export default Home;

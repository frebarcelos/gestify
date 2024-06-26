import React, { useState, useEffect } from 'react';
import TaskList from '../components/molecules/TaskList';
import { ITask, ICategory } from '../interfaces/ICardTask';
import NavBar from '../components/atom/navbar';
import { Button, Container } from 'react-bootstrap';
import axios from '../axiosConfig';
import './styles.css';

const Home = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [categorias, setCategorias] = useState<ICategory[]>([]);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await axios.get('/Tasks/UserTasks');
        setTasks(response.data); 
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);        
        setTasks([]); 
      }
    }
    async function fetchCategorias() {
        try {
          const response = await axios.get('/Categories');
          setCategorias(response.data); 
        } catch (error) {
          console.error('Erro ao buscar Categorias:', error);        
          setCategorias([]); 
        }
      }
    fetchCategorias()
    fetchTasks();
  }, []);

  return (
    <>
      <NavBar />
      <div className='mt-5'>
        <Container>
        <div className='flexboxhome'>            
        
          {categorias.map((categoria, index) => (              
              <TaskList tasks={tasks} title={categoria.categoryName} />
          ))}
                  
         <Button variant="primary botaoNovaCategoria" onClick={() => setModalShow(true)}>Criar Nova Categoria </Button>
         </div>
          
        </Container>
      </div>
    </>
  );
};

export default Home;

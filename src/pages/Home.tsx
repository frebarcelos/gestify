import React, { useState, useEffect } from 'react';
import TaskList from '../components/molecules/TaskList';
import { ITask, ICategory } from '../interfaces/ICardTask';
import NavBar from '../components/atom/navbar';
import { Button, Container, Form, Modal } from 'react-bootstrap';
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
          const response = await axios.get('/Categories/UserCategories');
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
                        
        <TaskList tasks={tasks} title="Tarefas sem categoria" origem="home" />
          {categorias.map((categoria, index) => (              
              <TaskList tasks={tasks} title={categoria.categoryName} categoria={categoria.id} origem="categoria" />
          ))}
          
                  
         <Button variant="primary botaoNovaCategoria" onClick={() => setModalShow(true)}>Criar Nova Categoria </Button>
         </div>
          
        </Container>
      </div>
      <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}            
        />
    </>
  );
};

export default Home;

function MyVerticallyCenteredModal(props: any) {
    const [categoria, setCategoria] = useState<ICategoria>();   
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategoria({ ...categoria, [event.target.name]: event.target.value });
    };
    const handleSubmit = async () => {
        try {            
            await axios.post('/Categories', categoria);
            alert('Categoria criada com sucesso!');
            props.onHide(); 
            window.location.reload()
        } catch (error) {
            console.error('Erro ao criar Categoria:', error);
            alert('Erro ao criar Categoria.');
        }
    };

    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Criar Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Título da categoria:</Form.Label>
              <Form.Control type="text" placeholder="Nome da Categoria" name="categoryName" onChange={handleChange} />
            </Form.Group>           
            
           
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>Fechar</Button>
          <Button onClick={handleSubmit}>Salvar</Button>
        </Modal.Footer>
      </Modal>
    );
}

interface ICategoria {
    categoryName?: string
}

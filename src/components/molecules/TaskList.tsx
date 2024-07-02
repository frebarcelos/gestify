import React, { useState } from 'react';
import axios from '../../axiosConfig';
import {ITask, Status} from '../../interfaces/ICardTask';
import CardTask from '../atom/cardTask';
import { Button, Modal, Form, Card } from 'react-bootstrap';
import { convertDateToISO } from '../../services/utils';
import './styles.css';



interface ITaskList {
    title: string;
    tasks: ITask[];
    categoria?: number;
    origem: string;
}

const TaskList: React.FC<ITaskList> = ({ tasks, title, categoria, origem }) => { 
    const [modalShow, setModalShow] = useState(false);
    const [editar, setEditar] = useState(false);
    const [categoriaID, setCategoriaID] = useState<ICategoria>({ID: categoria, categoryName: title}); 
    const [titulo, setTitulo] = useState<string>(title)
    
    let tarefas: ITask[] = []
    let tarefasCategoria: ITask[] = []
    
    tasks.map((task, index) => {
        if (!task.categoryID && origem == "home") {
            tarefas.push(task);
        }
    })
    function editando() {
        setEditar(true)
        setTitulo(title)
    }
    const handleDelete = async () => {
        if (tarefasCategoria.length > 0) {
            return alert("Categoria não pode ser excluida, pois existem tarefas nela")
        }
        if (categoria) {
            try {
                await axios.delete(`/Categories/${categoria}`);
                alert('Categoria excluída com sucesso!');                
                window.location.reload()
            } catch (error) {
                console.error('Erro ao excluir Categoria:', error);
                alert('Erro ao excluir Categoria.');
            }
        }
    };
    const handleSubmit = async () => {
        if (categoriaID) {
            try {
                categoriaID.categoryName = titulo;
                categoriaID.ID = categoria;
                await axios.put(`/Categories/${categoria}`, categoriaID);
                alert('Categoria atualizada com sucesso!');                
                window.location.reload()
            } catch (error) {
                console.error('Erro ao atualizar Categoria:', error);
                alert('Erro ao atualizar Categoria.');
            }
        }
    };
    
    if (origem == "home" && tarefas.length > 0) {
        return (<Card className='w-25 bg-light text-dark cardTarefas'>
        <Card.Header><strong>{title}</strong></Card.Header>
        <Card.Body>
          {tarefas.map((task, index) => {
              if (task.categoryID == categoria) {                
                return <CardTask key={index} task={task} />
            } 
          }            
          )}          
        </Card.Body>
      </Card>)
    } else if (origem == "categoria") {
    return (
      <Card className='w-25 bg-light text-dark cardTarefas'>
            <Card.Header className='titulo'>
                {editar ? <><Form> <Form.Control type="text" placeholder="Nome da Categoria" name="categoryName" onChange={(e) => setTitulo(e.target.value)} value={titulo} /></Form> <div className='botoes'><Button onClick={() => setEditar(false)} variant="danger" className='botao'>Canceler</Button><Button onClick={handleSubmit} variant="primary" className='botao'>salvar</Button></div></> : (<><strong>{title}</strong><div className='botoes'> <Button onClick={handleDelete} variant="danger" className='botao'>Deletar</Button><Button onClick={() => editando()} variant="primary" className='botao'>Editar</Button></div></>)}
            </Card.Header>
        <Card.Body>
          {tasks.map((task, index) => {
              if (task.categoryID == categoria) {
                tarefasCategoria.push(task)
                return <CardTask key={index} task={task} />
            } 
          }            
          )}
          <Button variant="primary" onClick={() => setModalShow(true)}>Criar Nova Tarefa</Button>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            categoria={categoria}
          />
          
        </Card.Body>
      </Card>
        );
    }
}

export default TaskList;

function MyVerticallyCenteredModal(props: any) {
    const [task, setTask] = useState<ITask>({});    

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTask({ ...task, [event.target.name]: event.target.value });
    };

    const handleSubmit = async () => {
        try {
            task.creationDate = convertDateToISO(task.creationDate);
            task.completionDate = convertDateToISO(task.completionDate);
            task.statusID = 1;
            task.categoryID = props.categoria;
            await axios.post('/Tasks', task);
            alert('Tarefa criada com sucesso!');
            props.onHide(); 
            window.location.reload()
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
            alert('Erro ao criar tarefa.');
        }
    };

    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Criar Tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control type="text" placeholder="Título da tarefa" name="title" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descrição</Form.Label>
              <Form.Control type="text" placeholder="Descrição da tarefa" name="description" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data de Inicio</Form.Label>
              <Form.Control type="date" placeholder="Descrição da tarefa" name="creationDate" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data de conclusão</Form.Label>
              <Form.Control type="date" placeholder="Descrição da tarefa" name="completionDate" onChange={handleChange} />
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
    ID?: number,
    categoryName?: string
}




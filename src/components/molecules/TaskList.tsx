import React, { useState } from 'react';
import axios from '../../axiosConfig';
import {ITask} from '../../interfaces/ICardTask';
import CardTask from '../atom/cardTask';
import { Button, Modal, Form, Card } from 'react-bootstrap';
import {convertDateToISO} from '../../services/utils';



interface ITaskList {
    title: string;
    tasks: ITask[];
}

const TaskList: React.FC<ITaskList> = ({ tasks, title }) => { 
    const [modalShow, setModalShow] = useState(false);
    
    return (
      <Card className='w-25 bg-light text-dark'>
        <Card.Header><strong>{title}</strong></Card.Header>
        <Card.Body>
          {tasks.map((task, index) => (
            <CardTask key={index} task={task} />
          ))}
          <Button variant="primary" onClick={() => setModalShow(true)}>Criar Nova Tarefa</Button>
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </Card.Body>
      </Card>
    );
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

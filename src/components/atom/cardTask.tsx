import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {ITask} from '../../interfaces/ICardTask';
import { Modal } from 'react-bootstrap';
import { convertISOToDate } from '../../services/utils';
import axios from '../../axiosConfig';


interface ICardTask {
    task: ITask
}

const CardTask: React.FC<ICardTask> = (props) => {
  const [modalShow, setModalShow] = useState(false); 
  

  return (
   <>
        <Button onClick={() => setModalShow(true)} className={`mb-2  w-100`}  >
          {props.task.title}
          </Button> 
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            card={props.task}
          />  
    </>
      
     
  );
}

export default CardTask;

const MyVerticallyCenteredModal: React.FC<ModalProps> = ({ onHide, show, card }) => {
    
    const handleSubmit = async () => {
        if(card.id) {
        try {            
            await axios.delete(`/Tasks/${card.id}`);
            alert('Tarefa excluida com sucesso!');
            onHide(); 
            window.location.reload()
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
            alert('Erro ao excluida tarefa.');
            }
        }
    };
    return (
      <Modal   show={show} onHide={onHide}  size="lg" centered>
        <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"><div>{card.title}</div><div></div></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {card.id}
                <div>Data de inicio: {convertISOToDate(card.creationDate)}</div>                
                <div>Data de conclusão: {convertISOToDate(card.completionDate)}</div>        
            <div>descrição; {card.description}</div>
        </Modal.Body>
        <Modal.Footer>          
          <Button onClick={onHide}>Fechar</Button>
          <Button onClick={handleSubmit} variant="danger">Deletar</Button>
        </Modal.Footer>
      </Modal>
    );
}

interface ModalProps {
    onHide: () => void;
    show: boolean;
    card: ITask;
}
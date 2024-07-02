import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { ICategory, ITask } from '../../interfaces/ICardTask';
import { Form, Modal } from 'react-bootstrap';
import { convertDateToISO,  convertISOToDate } from '../../services/utils';
import axios from '../../axiosConfig';
import './styles.css';

interface ICardTask {
    task: ITask
}

const CardTask: React.FC<ICardTask> = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [statuscolor, setStatusColor] = useState<string>('secondary');

    useEffect(() => {
        if (props.task.status?.id == 2) {
            setStatusColor('primary')
        } else if (props.task.status?.id == 3) {
            setStatusColor('warning')
        } else if (props.task.status?.id == 4) {
            setStatusColor('success')
        }
    })

    return (
        <>
            <Button onClick={() => setModalShow(true)} className={`mb-2 w-100`} variant={statuscolor}>
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
    const [editar, setEditar] = useState(false);
    const [task, setTask] = useState<ITask>({ ...card });
    const [statusID, setStatusID] = useState<number | undefined>(task.status?.id);
    const [categorias, setCategorias] = useState<ICategory[]>([]);
    const [categoria, setCategoria] = useState<number | undefined>(card.categoryID)
    

    useEffect(() => {
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
        card.creationDate = convertISOToDate(card.creationDate);
        card.completionDate = convertISOToDate(card.completionDate);
        task.statusID = statusID;
        setTask({ ...card });

    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTask({ ...task, [event.target.name]: event.target.value });
    };

    const handleDelete = async () => {
        if (card.id) {
            try {
                await axios.delete(`/Tasks/${card.id}`);
                alert('Tarefa excluída com sucesso!');
                onHide();
                window.location.reload()
            } catch (error) {
                console.error('Erro ao excluir tarefa:', error);
                alert('Erro ao excluir tarefa.');
            }
        }
    };

    const handleSave = async () => {
        if (task.id) {
            try {
                task.creationDate = convertDateToISO(task.creationDate);
                task.completionDate = convertDateToISO(task.completionDate);
                task.statusID = statusID;
                task.categoryID = categoria;
                await axios.put(`/Tasks/${task.id}`, task);
                alert('Tarefa atualizada com sucesso!');
                onHide();
                window.location.reload()
            } catch (error) {
                console.error('Erro ao atualizar tarefa:', error);
                alert('Erro ao atualizar tarefa.');
            }
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className='modalCard'>
                    <div>{card.title}</div>
                    <Button onClick={() => setEditar(!editar)}>{!editar ? "Editar" : "Cancelar"}</Button>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!editar ? (
                    <>  <div>Status da tarefa: {card.status?.statusName}</div>
                        <div>Cateogoria: {task.category?.categoryName ? task.category?.categoryName : "Sem categoria"}</div>
                        <div>Data de início: {convertISOToDate(card.creationDate)}</div>
                        <div>Data de conclusão: {convertISOToDate(card.completionDate)}</div>
                        <div>Descrição: {card.description}</div>
                    </>
                ) : (
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Título</Form.Label>
                            <Form.Control type="text" placeholder="Título da tarefa" name="title" value={task.title} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label>Status da tarefa</Form.Label>
                            <Form.Select size="lg" name="statusID" value={statusID?.toString()} onChange={(e) => setStatusID(parseInt(e.target.value))}>
                                <option value="1">A fazer</option>
                                <option value="2">Em progresso</option>
                                <option value="3">Em revisão</option>
                                <option value="4">Feito</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label>Categoria</Form.Label>
                            <Form.Select size="lg" name="statusID" value={categoria} onChange={(e) => setCategoria(parseInt(e.target.value))}>
                            <option value=''></option>
                            {categorias.map((categoria, index) => (              
                                <option value={categoria.id}>{categoria.categoryName}</option>
                            ))}
                                                                
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descrição</Form.Label>
                            <Form.Control type="text" placeholder="Descrição da tarefa" name="description" value={task.description} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Data de Início</Form.Label>
                            <Form.Control type="date" name="creationDate" value={task.creationDate} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Data de Conclusão</Form.Label>
                            <Form.Control type="date" name="completionDate" value={task.completionDate} onChange={handleChange} />
                        </Form.Group>
                        
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Fechar</Button>
                {!editar ? (
                    <Button onClick={handleDelete} variant="danger">Deletar</Button>
                ) : (
                    <Button onClick={handleSave} variant="success">Salvar</Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}

interface ModalProps {
    onHide: () => void;
    show: boolean;
    card: ITask;
}

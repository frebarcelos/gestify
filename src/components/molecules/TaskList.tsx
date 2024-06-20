import React, { useState } from 'react';
import ICardTask from '../../interfaces/ICardTask';
import CardTask from '../atom/cardTask';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';

interface ITaskList {
    title: string;
    tasks: ICardTask[]
}


const TaskList: React.FC<ITaskList> = ({ tasks, title }) => { 
    
    return (
      <Card className='w-25 bg-light text-dark'>
      <Card.Header><strong>{title}</strong></Card.Header>
      <Card.Body>
      {tasks &&
        tasks.map((task) => {
            return (
                
                <CardTask title={task.title} color={task.color} data={task.data} message={task.message} />
                
        )})}
        </Card.Body>
    </Card>
       
    )
}

export default TaskList
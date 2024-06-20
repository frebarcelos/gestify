import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';

interface CardTaskProps {
    color: string;
    title?: string;
    message?: string;
  }


const CardTask: React.FC<CardTaskProps> = ({ color, title, message }) => {
  const [showA, setShowA] = useState(true);

  const toggleShowA = () => setShowA(!showA);  

  return (
   <>
        <Button onClick={toggleShowA} className={`mb-2 ${color}`} >
          Toggle Toast <strong>with</strong> Animation
        </Button>
        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>11 mins ago</small>
          </Toast.Header>
          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
          </Toast>
    </>
      
     
  );
}

export default CardTask;
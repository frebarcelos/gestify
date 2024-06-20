import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ICardTask from '../../interfaces/ICardTask';



const CardTask: React.FC<ICardTask> = ({ color, title, message, data }) => {
  const [showA, setShowA] = useState(true);

  const toggleShowA = () => setShowA(!showA);  

  return (
   <>
        <Button onClick={toggleShowA} className={`mb-2 ${color} w-100`}  >
          {title}
        </Button>
        <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
            <small>{data}</small>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
          </Toast>
    </>
      
     
  );
}

export default CardTask;
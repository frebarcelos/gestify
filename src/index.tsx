// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/atom/navbar';
import Container from 'react-bootstrap/Container';

ReactDOM.render(
  <React.StrictMode>
    <NavBar   />
    <Container>
        <Routes />
    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();

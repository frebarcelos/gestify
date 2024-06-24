// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Routes from './routes';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext';
import Container from 'react-bootstrap/Container';


const container = document.getElementById('root');


const root = ReactDOM.createRoot(container!);

root.render(
  <React.StrictMode>
    <AuthProvider>      
      
        <Routes />
      
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();

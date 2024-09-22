import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/globals.css';
import './styles/menu.css';
import './styles/montserrat.css';

const root = document.getElementById('root') ?? document.body;

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

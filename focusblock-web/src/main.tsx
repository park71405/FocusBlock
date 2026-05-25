import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import axios from 'axios';
import App from './App';

axios.defaults.baseURL = "http://localhost:8080/";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/styles.scss';
import App from './App/App.tsx'
import './variables.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

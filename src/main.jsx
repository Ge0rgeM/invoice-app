import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '/src/Language/i18n'; // Import the i18n configuration
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// import './server'

// Renderiza o componente App dentro do elemento com id 'root' e utiliza StrictMode
// para ajudar na identificação de problemas
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
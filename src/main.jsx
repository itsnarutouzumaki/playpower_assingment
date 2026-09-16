import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/**
 * Application entry point. Mounts <App /> into #root (see index.html) inside
 * React.StrictMode to surface potential side-effect/lifecycle issues during
 * development.
 *
 * @author @itsnarutouzumaki
 */

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

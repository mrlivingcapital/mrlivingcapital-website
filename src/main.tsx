import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { startVitals } from './lib/vitals'

createRoot(document.getElementById('root')!).render(<App />)
void startVitals()
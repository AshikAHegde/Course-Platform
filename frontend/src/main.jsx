import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Email_Verfication_Page from './components/Email_Verfication_Page.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Email_Verfication_Page/>
  </StrictMode>,
)

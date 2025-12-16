import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppcontextProvider from './context/AppContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = "618283555805-038h8n4aj7cvvpbhhvh7jpjs2i43oq09.apps.googleusercontent.com";



createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <AppcontextProvider>
        <App />
      </AppcontextProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>,
)

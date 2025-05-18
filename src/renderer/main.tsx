import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AppProvider } from './context/context.tsx';
import './assets/main.css'
import { BrowserRouter, HashRouter } from 'react-router-dom';

const isDev = import.meta.env.MODE === 'development';
const Router = isDev ? BrowserRouter : HashRouter;

createRoot(document.getElementById('root')!).render(
  <Router >
    <AppProvider>
      <App />
    </AppProvider>
  </Router>
)

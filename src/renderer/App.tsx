import React from 'react';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import Login from './pages/Login';
import Callback from './pages/Callback';

function App() {
  const isDev = import.meta.env.MODE === 'development';
  const Router = isDev ? BrowserRouter : HashRouter;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </Router>
  );
}

export default App;

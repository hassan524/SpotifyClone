import React from 'react';
import { BrowserRouter, Routes, Route, HashRouter, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Callback from './pages/Callback';
import Layout from './layouts/layout';
import Home from './pages/Home';
import { useAppContext } from './context/context';
import Playlists from './pages/Playlists';
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate()

  const { Token } = useAppContext();

    React.useEffect(() => {
      console.log('here token bud', Token)
    if (Token) {
      navigate('/');
    }
  }, [Token]);

  return (
      <Routes>
        <Route
          path="/"
          element={Token ? <Layout /> : <Navigate to="/auth" replace />}
        >
          <Route index element={<Home />} />
          <Route path='/playlist/:id' element={<Playlists />} />
          
        </Route>

        <Route
          path="/auth"
          element={Token ? <Navigate to="/" replace /> : <Login />}
        />

        <Route path="/callback" element={<Callback />} />
      </Routes>
  );
}

export default App;

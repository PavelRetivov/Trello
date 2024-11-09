import { HashRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import React from 'react';
import Board from './pages/Board';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import ProtectedRouteLoginAndRegister from './pages/ProtectRoutLoginAndRegister';

function App(): JSX.Element {
  return (
    <HashRouter>
      <HelmetProvider>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route element={<ProtectedRouteLoginAndRegister />}>
            <Route path="/Login" element={<Login />} />
            <Route path="/Registration" element={<Registration />} />
          </Route>
          <Route path="/Board/:boardId" element={<Board />} />
          <Route path="/Board/:boardId/card/:cardId" element={<Board />} />{' '}
        </Routes>
      </HelmetProvider>
    </HashRouter>
  );
}

export default App;

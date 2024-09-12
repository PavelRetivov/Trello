import { HashRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import React from 'react';
import Board from './pages/Board/components/Board/Board';
import './App.css';
import Home from './pages/Home/components/Home/Home';

function App(): JSX.Element {
  return (
    <HashRouter>
      <HelmetProvider>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/Board/:boardId" element={<Board />} />
        </Routes>
      </HelmetProvider>
    </HashRouter>
  );
}

export default App;

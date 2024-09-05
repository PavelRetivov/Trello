import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import logo from './logo.svg';
import Board from './pages/Board/components/Board/Board';
import './App.css';
import Home from './pages/Home/components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index path="/" element={<Home />} />
          <Route path="/Board/:board_id" element={<Board />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

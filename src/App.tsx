import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Board from './pages/Board/components/Board/Board';
import './App.css';
import Home from './pages/Home/components/Home/Home';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index path="/" element={<Home />} />
          <Route path="/Board/:boardId" element={<Board />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

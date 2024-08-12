import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import logo from './logo.svg';
import Board from './pages/Board/components/Board/Board';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route
            index
            element={
              <div className="App">
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                  </p>
                  <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React
                  </a>
                </header>
              </div>
            }
          />
          <Route path="Board" element={<Board />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

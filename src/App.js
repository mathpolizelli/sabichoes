import { useState, useEffect } from "react";
import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom";
import "./styles/App.scss";

import Home from "./components/Home";
import Game from "./components/Game";
import Ranking from "./components/Ranking";
import { db } from "./firebase";

function App() {
  return (
    <div className="app">
      <Router>
        <div className="navbar">
          <h1>SABICHÕES</h1>
          <div className="links">
            <button className="link">
              <Link to="/sabichoes">Home</Link>
            </button>
            <button className="link">
              <Link to="/sabichoes/game">Jogar</Link>
            </button>
            <button className="link">
              <Link to="/sabichoes/ranking">Ranking</Link>
            </button>
          </div>
        </div>
        <Routes>
          <Route element={<Home />} path="sabichoes" />
          <Route element={<Game />} path="sabichoes/game" />
          <Route element={<Ranking />} path="sabichoes/ranking" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

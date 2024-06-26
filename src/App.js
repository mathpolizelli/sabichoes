import { useState, useEffect } from "react";
import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom";
import "./styles/App.scss";

import Home from "./components/Home";
import Game from "./components/Game";
import Ranking from "./components/Ranking";
import { db } from "./firebase";

function App() {
  return (
    <>
      <Router>
        <div className="navbar">
          <h1>SABICHÕES</h1>
          <div className="links">
            <button className="link">
              <Link to="/gamificacao">Home</Link>
            </button>
            <button className="link">
              <Link to="/gamificacao/game">Game</Link>
            </button>
            <button className="link">
              <Link to="/gamificacao/ranking">Ranking</Link>
            </button>
          </div>
        </div>
        <Routes>
          <Route element={<Home />} path="gamificacao" />
          <Route element={<Game />} path="gamificacao/game" />
          <Route element={<Ranking />} path="gamificacao/ranking" />
        </Routes>
      </Router>
    </>
  );
}

export default App;

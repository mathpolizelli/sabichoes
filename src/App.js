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
              <Link to="/">Home</Link>
            </button>
            <button className="link">
              <Link to="/game">Game</Link>
            </button>
            <button className="link">
              <Link to="/ranking">Ranking</Link>
            </button>
          </div>
        </div>
        <Routes>
          <Route element={<Home />} path="/" exact />
          <Route element={<Game />} path="game" />
          <Route element={<Ranking />} path="ranking" />
        </Routes>
      </Router>
    </>
  );
}

export default App;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/Home.scss";

function Home() {
  const navigate = useNavigate()

  const navigateToGame = () => {
    navigate('/gamificacao/game')
  }

  const navigateToRanking = () => {
    navigate('/gamificacao/ranking')
  }

  return (
    <div className="home">
      <button onClick={navigateToGame} className="linkButton">JOGAR</button>
      <button onClick={navigateToRanking} className="linkButton">RANKING</button>
    </div>
  );
}

export default Home;

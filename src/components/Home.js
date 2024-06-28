import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/Home.scss";

function Home() {
  const navigate = useNavigate();

  const navigateToGame = () => {
    setTimeout(() => {
      navigate("/sabichoes/game");
    }, 200);
  };

  const navigateToRanking = () => {
    setTimeout(() => {
      navigate("/sabichoes/ranking");
    }, 200);
  };

  return (
    <div className="home">
      <button onClick={navigateToGame} className="linkButton">
        JOGAR
      </button>
      <button onClick={navigateToRanking} className="linkButton">
        RANKING
      </button>
    </div>
  );
}

export default Home;

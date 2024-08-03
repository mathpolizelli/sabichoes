import { useNavigate } from "react-router-dom";
import "../styles/App.scss";
import { useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();

  const navigateToHome = () => {
    setTimeout(() => {
      navigate("/sabichoes");
    }, 100);
  };

  const navigateToGame = () => {
    setTimeout(() => {
      navigate("/sabichoes/game");
    }, 100);
  };

  const navigateToRanking = () => {
    setTimeout(() => {
      navigate("/sabichoes/ranking");
    }, 100);
  };

  useEffect(() => {
    navigate("/sabichoes")
  }, [])

  return (
    <div className="navbar">
      <h1
        onClick={navigateToHome}
        style={{
          fontFamily: "Holtwood One SC, Arial",
          color: "white",
          marginLeft: "10px",
        }}
      >
        SABICHÕES
      </h1>
      <div className="links">
        <button className="linkButton" onClick={navigateToHome} id="homeBtn">
          Home
        </button>
        <button className="linkButton" onClick={navigateToGame}>
          Jogar
        </button>
        <button className="linkButton" onClick={navigateToRanking}>
          Ranking
        </button>
      </div>
    </div>
  );
}

export default Navbar;

import { Link } from "react-router-dom";

import "../styles/Home.scss";

function Home() {
  return (
    <div>
      <Link to="/game" className="linkButton">JOGAR</Link>
      <Link to="/ranking" className="linkButton">RANKING</Link>
    </div>
  );
}

export default Home;

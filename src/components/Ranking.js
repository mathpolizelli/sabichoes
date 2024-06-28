import { useEffect, useState } from "react";
import { query, orderBy, getDocs, collection, limit } from "firebase/firestore";
import { db } from "../firebase";

import "../styles/Ranking.scss";

function Ranking() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(
          query(collection(db, "scores"), orderBy("score", "desc"), limit(10))
        );
        const fetchedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        //const fetchedData = snapshot.docs.map
        setData(fetchedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="ranking">
      <h1>Melhores jogadores!!</h1>
      <div className="rankingCard">
        <ol>
          {data.map((item) => (
            <li key={item.id}>
              {item.player}
            </li>
          ))}
        </ol>
        <ol>
          {data.map((item) => (
            <li key={item.id}>
                {item.score}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Ranking;

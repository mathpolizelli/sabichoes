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
      <h2>Melhores jogadores!!</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.player}
          </li>
        ))}
      </ul>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
              {item.score}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ranking;

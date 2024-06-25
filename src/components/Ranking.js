import { useEffect, useState } from "react";
import { query, orderBy, getDocs, collection, limit } from "firebase/firestore";
import { db } from "../firebase";

function Ranking() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(query(collection(db, "scores"), orderBy("score", "desc"), limit(10)))
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
    <ul>
      {data.map((item) => (
        <li key={item.id}>
          {item.player} - {item.score}
        </li>
      ))}
    </ul>
  );
}

export default Ranking;

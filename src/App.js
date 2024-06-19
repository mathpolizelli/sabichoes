import { useState, useEffect } from 'react';
import { Routes, Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { collection, addDoc, doc, docs, getDocs } from 'firebase/firestore'
import './styles/App.scss';

import Home from './components/Home'
import Game from './components/Game'
import Ranking from './components/Ranking'
import { db } from './firebase'

function App() {
  const [ data, setData ] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'scores'))
        const fetchedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        //const fetchedData = snapshot.docs.map
        setData(fetchedData)
      } catch (error) {
        console.error(error)
      }
    }  
    fetchData()
  }, [])  
  console.log(data)
  return (
    <>
      <Router>
        <div className='navbar'>
          <h1>QUIZ</h1>
          <Link to="/">Home</Link>
          <Link to="/game">Game</Link>
          <Link to="/ranking">Ranking</Link>
          <button>ADD</button>
          <ul>
            {data.map(item => (
              <li key={item.id}>{item.player} - {item.score}</li>
            ))}
          </ul>
        </div>
        <Routes>
          <Route element={ <Home /> } path="/" exact />
          <Route element={ <Game /> } path="game" />
          <Route element={ <Ranking /> } path="ranking" />
        </Routes>
      </Router>
    </>
  );
}

export default App;

import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

import { db } from "../firebase";
import "../styles/Game.scss";
import questionsjson from "../questions.json";

function Game() {
  const [playerName, setPlayerName] = useState("");
  const [inputValue, setInputValue] = useState();
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(1);
  const [available, setAvailable] = useState([1]);
  const [questions, setQuestions] = useState({
    1: {
      question: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correctanswer: "",
    },
  });
  const [lastQuestion, setLastQuestion] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const n = 25;

  useEffect(() => {
    setQuestions(questionsjson);

    let list = [];
    for (let i = 1; i <= n; i++) {
      list.push(i);
    }
    setAvailable(list);
  }, []);

  useEffect(() => {
    setLastQuestion(available.pop());
  }, [available, streak, currentQuestion]);

  useEffect(() => {
    console.log("GAME OVER");
  }, [gameOver]);

  const isAnswerRight = (answer, questionNum) => {
    if (
      document.getElementById(answer).innerText ==
      questions[questionNum].correctanswer
    ) {
      console.log("true");
      setTimeout(() => {
        setScore(score + 100 * streak);
        setCurrentQuestion(currentQuestion + 1);
        setStreak(streak + 1);
      }, 1000);
    } else {
      console.log("false");
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setStreak(1);
        setLives(lives - 1);
      }, 1000);
    }
  };

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  shuffle(available);

  const addData = async () => {
    try {
      const docRef = collection(db, "scores");
      console.log(playerName, score);
      await addDoc(docRef, {
        player: playerName,
        score: score,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlayerName(inputValue);
  };

  if (playerName == "") {
    return (
      <form onSubmit={handleSubmit}>
        <p>QUAL É O SEU NOME?</p>
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleChange}>
        </input>
      </form>
    );
  }

  if (lives == 0) {
    if (gameOver == 0) {
      addData();
      setGameOver(1);
    }

    return (
      <div>
        <h1>GAME OVER</h1>
        <h1>
          {playerName} fez {score} pontos!
        </h1>
        <button>
          <Link to="/gamificacao">HOME</Link>
        </button>
        <button>
          <Link to="/gamificacao/game">GAME</Link>
        </button>
        <button>
          <Link to="/gamificacao/ranking">RANKING</Link>
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="questionCard">
        <p>
          {playerName} - {lives}
        </p>
        <h2>
          {currentQuestion}. {questions[lastQuestion].question}
        </h2>
        <div className="answerRow">
          <button
            className="answerButton"
            id="answer1"
            onClick={() => isAnswerRight("answer1", lastQuestion)}
          >
            {questions[lastQuestion].answer1}
          </button>
          <button
            className="answerButton"
            id="answer2"
            onClick={() => isAnswerRight("answer2", lastQuestion)}
          >
            {questions[lastQuestion].answer2}
          </button>
        </div>
        <div className="answerRow">
          <button
            className="answerButton"
            id="answer3"
            onClick={() => isAnswerRight("answer3", lastQuestion)}
          >
            {questions[lastQuestion].answer3}
          </button>
          <button
            className="answerButton"
            id="answer4"
            onClick={() => isAnswerRight("answer4", lastQuestion)}
          >
            {questions[lastQuestion].answer4}
          </button>
        </div>
        <p>{score}</p>
      </div>
    </>
  );
}

export default Game;

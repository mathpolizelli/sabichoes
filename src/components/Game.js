import { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

import { db } from "../firebase";
import "../styles/Game.scss";
import questionsjson from "../questions.json";
import correctSound from "../sounds/correct-sound.mp3";
import wrongSound from "../sounds/wrong-sound.mp3";

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
  const [defaultButtonStyles, setDefaultButtonStyles] = useState({
    backgroundColor: "#eaeaea",
    width: "300px",
    height: "60px",
    fontSize: "20px",
    margin: "10px",
    border: "none",
    borderRadius: "10px",
    boxShadow: "0px 5px 1px #7e7e7e",
  });
  const [buttonStyle1, setButtonStyle1] = useState(defaultButtonStyles);
  const [buttonStyle2, setButtonStyle2] = useState(defaultButtonStyles);
  const [buttonStyle3, setButtonStyle3] = useState(defaultButtonStyles);
  const [buttonStyle4, setButtonStyle4] = useState(defaultButtonStyles);
  const [correctAudio] = useState(new Audio(correctSound));
  const [wrongAudio] = useState(new Audio(wrongSound));
  const n = 50;

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

  const isAnswerRight = (answer, questionNum) => {
    if (
      document.getElementById(answer).innerText ==
      questions[questionNum].correctanswer
    ) {
      correctAudio.play();
      switch (answer) {
        case "answer1":
          setButtonStyle1({
            ...defaultButtonStyles,
            backgroundColor: "#20c868",
          });
          break;
        case "answer2":
          setButtonStyle2({
            ...defaultButtonStyles,
            backgroundColor: "#20c868",
          });
          break;
        case "answer3":
          setButtonStyle3({
            ...defaultButtonStyles,
            backgroundColor: "#20c868",
          });
          break;
        case "answer4":
          setButtonStyle4({
            ...defaultButtonStyles,
            backgroundColor: "#20c868",
          });
          break;
      }
      setTimeout(() => {
        setScore(score + 100 * streak);
        setCurrentQuestion(currentQuestion + 1);
        setStreak(streak + 1);
        setButtonStyle1(defaultButtonStyles);
        setButtonStyle2(defaultButtonStyles);
        setButtonStyle3(defaultButtonStyles);
        setButtonStyle4(defaultButtonStyles);
      }, 1000);
    } else {
      wrongAudio.play();
      switch (answer) {
        case "answer1":
          setButtonStyle1({
            ...defaultButtonStyles,
            backgroundColor: "#f32732",
          });
          break;
        case "answer2":
          setButtonStyle2({
            ...defaultButtonStyles,
            backgroundColor: "#f32732",
          });
          break;
        case "answer3":
          setButtonStyle3({
            ...defaultButtonStyles,
            backgroundColor: "#f32732",
          });
          break;
        case "answer4":
          setButtonStyle4({
            ...defaultButtonStyles,
            backgroundColor: "#f32732",
          });
          break;
      }
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        setStreak(1);
        setLives(lives - 1);
        setButtonStyle1(defaultButtonStyles);
        setButtonStyle2(defaultButtonStyles);
        setButtonStyle3(defaultButtonStyles);
        setButtonStyle4(defaultButtonStyles);
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

  // RENDER

  if (playerName == "") {
    return (
      <form className="nameForm" onSubmit={handleSubmit}>
        <p>QUAL É O SEU NOME?</p>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          maxLength="25"
        ></input>
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
          <Link to="/sabichoes">HOME</Link>
        </button>
        <button
          onClick={() => {
            window.location.reload();
          }}
        >
          <Link to="/sabichoes/game">GAME</Link>
        </button>
        <button>
          <Link to="/sabichoes/ranking">RANKING</Link>
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
            style={buttonStyle1}
            onClick={() => isAnswerRight("answer1", lastQuestion)}
          >
            {questions[lastQuestion].answer1}
          </button>
          <button
            className="answerButton"
            id="answer2"
            style={buttonStyle2}
            onClick={() => isAnswerRight("answer2", lastQuestion)}
          >
            {questions[lastQuestion].answer2}
          </button>
        </div>
        <div className="answerRow">
          <button
            className="answerButton"
            id="answer3"
            style={buttonStyle3}
            onClick={() => isAnswerRight("answer3", lastQuestion)}
          >
            {questions[lastQuestion].answer3}
          </button>
          <button
            className="answerButton"
            id="answer4"
            style={buttonStyle4}
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

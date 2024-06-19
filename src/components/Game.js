import { useState, useEffect } from 'react'
import { Link, Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import '../styles/App.scss';
import questionsjson from '../questions.json'

function Game() {
    const [score, setScore] = useState(0)
    const [streak, setStreak] = useState(1)
    const [available, setAvailable] = useState([1])
    const [questions, setQuestions] = useState({1 : {
      "question": "",
      "answer1": "",
      "answer2": "",
      "answer3": "",
      "answer4": "",
      "correctanswer": ""
      }})
    const [lastQuestion, setLastQuestion] = useState(1)
    const [currentQuestion, setCurrentQuestion] = useState(1)
    const n = 27
  
    useEffect(() => {
      setQuestions(questionsjson)
      
      let list = []
      for(let i=1; i <= n; i++) {
        list.push(i)
      }
      setAvailable(list)
    }, [])
  
    useEffect(() => {
      setLastQuestion(available.pop())
      }, [available, streak, currentQuestion])
  
    const isAnswerRight = (answer, questionNum) => {
      if (document.getElementById(answer).innerText == questions[questionNum].correctanswer) {
        console.log("true")
        setTimeout(() => {
          setScore(score + 100 * streak)
          setCurrentQuestion(currentQuestion+1)
          setStreak(streak + 1)}, 1000)
      } else {
        console.log("false")
        setTimeout(() => {
          setCurrentQuestion(currentQuestion+1)
          setStreak(1)}, 1000)
      }
    }
  
    //console.log(questions)
    console.log(currentQuestion)
    /*const getRandomQuestion = (min, max) => {
      return Math.floor(Math.random() * (max + 1 - min) + min)
      }
    const questionNum = (getRandomQuestion(1,n)).toString()*/
  
    const shuffle = (array) => {
      let currentIndex = array.length, randomIndex
  
      while (currentIndex!=0) {
        randomIndex = Math.floor(Math.random()*currentIndex)
        currentIndex--
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
      }
      return array
    }  
    
    shuffle(available)
    
    //console.log(available)
    //console.log(lastQuestion)
  
    return (
      <>
          <div className="questionCard">
            <h2>{currentQuestion}. {questions[lastQuestion].question}</h2>
            <div className="answerRow">
              <button className="answerButton" id="answer1" onClick={() => isAnswerRight("answer1",lastQuestion)}>{questions[lastQuestion].answer1}</button>
              <button className="answerButton" id="answer2" onClick={() => isAnswerRight("answer2",lastQuestion)}>{questions[lastQuestion].answer2}</button>
            </div>
            <div className="answerRow">
              <button className="answerButton" id="answer3" onClick={() => isAnswerRight("answer3",lastQuestion)}>{questions[lastQuestion].answer3}</button>
              <button className="answerButton" id="answer4" onClick={() => isAnswerRight("answer4",lastQuestion)}>{questions[lastQuestion].answer4}</button>
            </div>
            <p>{score}</p>
          </div>
      </>
    )
}

export default Game;
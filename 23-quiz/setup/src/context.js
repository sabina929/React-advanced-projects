import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const url = ''
const tempUrl =
  'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'


const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true)
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [error, setError] = useState(false)
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'easy'
  })
  const [isModalOpen, setIsModalOpened] = useState(false)

  const fetchQuestions = async (url) =>{
    setWaiting(true)
    setLoading(true)

    const responce = await axios(url).catch(err=>console.log(err))
    if(response){
      const data = response.data.results
      if(data.length > 0){
        setWaiting(false)
        setLoading(false)
        setError(false)
        setQuestions(data)
      }
      else{
        setWaiting(true)
        setLoading(true)
      }
    }
    else {
      setWaiting(true)
    }
  }

  const nextQuestion = () =>{
    setIndex(oldIndex=>{
      const index = oldIndex + 1
      if(index > questions.length - 1) {
        openModal()
        return 0
      }
      else {
        return index
      }
    })
  }

  const openModal = () => {
    setIsModalOpened(true)
  }
  const closeModal = () => {
    setIsModalOpened(false)
    setCorrect(0)
    setWaiting(true)
  }


  const checkAnswer = (value) =>{
    if(value){
      setCorrect(oldState => oldState + 1)
    }
    nextQuestion()
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setQuiz({...quiz, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const {amount, category, difficulty} = quiz

    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`

    fetchQuestions(url)
  }

  return (
    <AppContext.Provider value={{
      waiting,
      loading,
      questions,
      index,
      correct,
      error,
      isModalOpen,
      nextQuestion,
      checkAnswer,
      closeModal,
      quiz,
      handleChange,
      handleSubmit
    }}>
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }

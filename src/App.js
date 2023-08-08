import { useEffect, useReducer } from 'react'

import Header from './Header'
import Loader from './Loader'
import Error from './Error'
import Main from './components/Main'
import StartScreen from './components/StartScreen'
import { Question } from './components/Question'
import NextButton from './components/NextButton'
import Progress from './components/Progress'
import FinishedScreen from './components/FinishedScreen'
import Timer from './components/Timer'
import Footer from './components/Footer'

import './index.css'

const SECS_PER_QUESTION = 30

/**
 * @initialState
 */
const initialState = {
  questions: [],

  // loading
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
}

/**
 * @reducer
 */
function reducer(state, action) {
  switch (action.type) {
    case 'DATA_RECEIVED': {
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      }
    }

    case 'DATA_FAILED': {
      return {
        ...state,
        status: 'error',
      }
    }

    // start quiz
    case 'START': {
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      }
    }

    // NEW ANSWER
    case 'NEW_ANSWER': {
      const question = state.questions.at(state.index)
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      }
    }

    // NEXT QUESTION
    case 'NEXT_QUESTION': {
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      }
    }

    // FINSIH QUIZ
    case 'FINISH': {
      return {
        ...state,
        status: 'finished',
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      }
    }

    // RESTART QUIZ
    case 'RESTART': {
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
      }
    }

    // TICKING TIME
    case 'TICK': {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      }
    }

    default: {
      return {
        ...state,
      }
    }
  }
}

// App Component
function App() {
  const [
    { questions, answer, status, index, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState)

  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  )

  useEffect(() => {
    fetch('http://localhost:9000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'DATA_RECEIVED', payload: data }))
      .catch((err) => dispatch({ type: 'DATA_FAILED' }))
  }, [])

  return (
    <div className='app'>
      {/* Header */}
      <Header />

      {/* Main */}
      <Main className='main'>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={questions.length} dispatch={dispatch} />
        )}

        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={questions.length}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />

            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={questions.length}
              />
            </Footer>
          </>
        )}

        {status === 'finished' && (
          <FinishedScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  )
}

export default App

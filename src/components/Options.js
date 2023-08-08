import React from 'react'

function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null
  return (
    <div>
      <div className='options'>
        {question.options.map((opt, index) => {
          return (
            <button
              className={`btn btn-option ${index === answer ? 'answer' : ''} ${
                hasAnswered
                  ? index === question.correctOption
                    ? 'correct'
                    : 'wrong'
                  : ''
              }`}
              key={opt}
              onClick={(e) => dispatch({ type: 'NEW_ANSWER', payload: index })}
              disabled={answer !== null}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Options

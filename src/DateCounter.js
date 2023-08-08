import { useReducer, useState } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'DECREMENT': {
      return {
        ...state,
        count: state.count - state.step,
      }
    }

    case 'INCREMENT': {
      return {
        ...state,
        count: state.count + state.step,
      }
    }

    case 'SET_COUNT': {
      return {
        ...state,
        count: action.payload,
      }
    }

    case 'SET_STEP': {
      return {
        ...state,
        step: action.payload,
      }
    }

    case 'RESET': {
      return {
        ...state,
        count: 0,
        step: 1,
      }
    }

    default: {
      return {
        ...state,
      }
    }
  }
}

function DateCounter() {
  const initialState = {
    count: 0,
    step: 1,
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  // This mutates the date object.
  const date = new Date('june 21 2027')
  date.setDate(date.getDate() + state.count)

  // decrement count by +
  const dec = function () {
    // setCount((count) => count - 1);
    dispatch({ type: 'DECREMENT' })
  }

  // Increment count by +
  const inc = function () {
    // setCount((count) => count + 1);
    dispatch({ type: 'INCREMENT' })
  }

  // input Count value
  const defineCount = function (e) {
    dispatch({ type: 'SET_COUNT', payload: Number(e.target.value) })
  }

  // define Step value
  const defineStep = function (e) {
    dispatch({ type: 'SET_STEP', payload: Number(e.target.value) })
  }

  // reset valyes
  const reset = function () {
    dispatch({ type: 'RESET' })
  }

  return (
    <div className='counter'>
      <div>
        <input
          type='range'
          min='0'
          max='10'
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}
export default DateCounter

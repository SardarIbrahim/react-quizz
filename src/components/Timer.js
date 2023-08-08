import React, { useEffect } from 'react'

function Timer({ secondsRemaining, dispatch }) {
  const mins = Math.floor(secondsRemaining / 60)
  const seconds = secondsRemaining % 60

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'TICK' })
    }, 1000)

    return () => clearInterval(id)
  }, [dispatch])

  return (
    <div className='timer'>
      {mins} : {seconds}
    </div>
  )
}

export default Timer

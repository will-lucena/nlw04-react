
import { useState, useEffect, useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengesContext";
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout;

export function Countdown(){

  const { startNewChallenge } = useContext(ChallengeContext)

  const initialTime = .1 * 60
  const [time, setTime] = useState(initialTime)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time/60)
  const seconds = time % 60

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  function startCountdown(){
    setIsActive(true)
  }

  function resetCountdown(){
    clearTimeout(countdownTimeout)
    setIsActive(false)
    setTime(initialTime);
  }

  useEffect(() => {
    if (isActive && time > 0){
      countdownTimeout = setTimeout(() => {
        setTime(time-1)
      }, 1000);
    } else if (isActive && time === 0){
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, time])

  return (
    <div>
      <div className={styles.container}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>

        <span>:</span>
        
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ?
        <button disabled className={styles.button} onClick={startCountdown}>
        Completed
      </button> 
      : <>
      { isActive? 
      <button  className={`${styles.button} ${styles.buttonActive}`} onClick={resetCountdown}>
        Stop
      </button> : 
      <button className={styles.button} onClick={startCountdown}>
        Start
      </button> }
      </>}

      
    </div>
  )
}
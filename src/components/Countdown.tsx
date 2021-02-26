
import { useContext } from "react";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from '../styles/components/Countdown.module.css'

let countdownTimeout: NodeJS.Timeout;

export function Countdown(){

  const {minutes, seconds, isActive, hasFinished, startCountdown, resetCountdown} = useContext(CountdownContext)

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

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
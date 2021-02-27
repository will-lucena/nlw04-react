import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/ChallengesBox.module.css'

export function ChallengesBox(){

  const {activeChallenge, resetChallenge, completeChallenge} = useContext(ChallengesContext)
  const {resetCountdown} = useContext(CountdownContext)
  
  function handleChallengeSucceded(){
    completeChallenge()
    resetCountdown()
  }

  function handleChallengeFailed(){
    resetChallenge()
    resetCountdown()
  }

  return(
    <div className={styles.container}>
      { activeChallenge ? (
        <div className={styles.active}>
          <header>Win {activeChallenge.amount}</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
            <strong>New Challenge</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button type="button" className={styles.failedButton} onClick={handleChallengeFailed}>Fail</button>
            <button type="button" className={styles.successedButton} onClick={handleChallengeSucceded}>Done</button>
          </footer>
        </div>
      ) : ( 
        <div className={styles.notActive}>
        <strong>Finish to win</strong>
        <p>
          <img src="icons/level-up.svg" alt="level up"/>
          Do tasks do up
        </p>
      </div>
        )}
    </div>
  )
}
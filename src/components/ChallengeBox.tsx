import { useContext } from 'react'
import { ChallengeContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox(){

  const {activeChallenge, resetChallenge} = useContext(ChallengeContext)

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
            <button type="button" className={styles.failedButton} onClick={resetChallenge}>Fail</button>
            <button type="button" className={styles.successedButton}>Done</button>
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
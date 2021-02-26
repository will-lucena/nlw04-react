import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox(){

  const hasActiveChallenge = true

  return(
    <div className={styles.container}>
      { hasActiveChallenge ? (
        <div className={styles.active}>
          <header>Win xp</header>
          <main>
            <img src="icons/body.svg" alt=""/>
            <strong>New Challenge</strong>
            <p>Breath</p>
          </main>
          <footer>
            <button type="button" className={styles.failedButton}>Fail</button>
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
import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'

export default function Profile(){

  const {level} = useContext(ChallengesContext)

  return(
      <div className={styles.container}>
        <img src="https://github.com/will-lucena.png" alt="Will Lucena"/>
        <div>
          <strong>Will Lucena</strong>
          <p>
            <img src="icons/level.svg" alt="level icon"/>
            Level {level}
          </p>
        </div>
      </div>
    )
}
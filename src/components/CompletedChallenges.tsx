import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/CompletedChallenges.module.css'

export function CompletedChallenges(){

  const {challengesCompleted} = useContext(ChallengesContext)

  return (
    <div className={styles.container}>
      <span>Completed Challenges</span>
      <span>{challengesCompleted}</span>
    </div>
  )
} 
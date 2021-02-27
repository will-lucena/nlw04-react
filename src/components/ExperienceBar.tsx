import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar(){

  const {currentExperience, experienceToNextLevel} = useContext(ChallengesContext)

  const percentToNextLevel = Math.round((Number(currentExperience) * 100) / Number(experienceToNextLevel))

  return(
    <header className={styles.experienceBar} >
      <span>{currentExperience} xp</span>
      <div>
        <div style={{width: `${percentToNextLevel}%`}} />
        <span className={styles.currentExperience} style={{left: `${percentToNextLevel}%`}}>{currentExperience} px</span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  )
}
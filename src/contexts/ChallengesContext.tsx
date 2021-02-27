import { createContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'

import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'

interface Challenge{
  type: 'body' | 'eye',
  description: String,
  amount: Number
}

interface ChallengesContextData{
  level: Number,
  currentExperience: Number,
  challengesCompleted: Number,
  experienceToNextLevel: Number,
  activeChallenge: Challenge,
  levelUp: () => void,
  startNewChallenge: () => void,
  resetChallenge: () => void,
  completeChallenge: () => void,
  closeLevelUpModal: () => void
}

interface ChallengesProviderProps{
  children: ReactNode,
  level: Number,
  currentExperience: Number,
  challengesCompleted: Number
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({children, ...rest}: ChallengesProviderProps){
  const [level, setLevel] = useState(rest.level?? 1)
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience?? 0)
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted?? 0)
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

  const experienceFactor = 4
  const experienceToNextLevel = Math.pow((Number(level)+1) * experienceFactor, 2)

  // Execute only the first time the application rans
  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() =>{
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))
  },[level, currentExperience, challengesCompleted] )

  function levelUp(){
    setLevel(Number(level) + 1)
    setIsLevelUpModalOpen(true)
  }

  function startNewChallenge(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]
    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted'){
      new Notification('New challenge', {
        body: `Won ${challenge.amount} xp`
      })
    }
  }

  function resetChallenge(){
    setActiveChallenge(null)
  }

  function closeLevelUpModal(){
    setIsLevelUpModalOpen(false)
  }

  function completeChallenge(){
    if (!activeChallenge){
      return
    }
    const {amount} = activeChallenge

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel){
      finalExperience -= experienceToNextLevel
      levelUp()
    }
    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(Number(challengesCompleted)+1)
  }

  return(
    <ChallengesContext.Provider value={{level, currentExperience, challengesCompleted, experienceToNextLevel, closeLevelUpModal, activeChallenge, completeChallenge, levelUp, startNewChallenge, resetChallenge}}>
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )

}
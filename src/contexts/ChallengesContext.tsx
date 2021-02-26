import { createContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'

import challenges from '../../challenges.json'

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
  completeChallenge: () => void
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

  const experienceFactor = 4
  const experienceToNextLevel = Math.pow((level+1) * experienceFactor, 2)

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
    setLevel(level + 1)
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
    setChallengesCompleted(challengesCompleted+1)
  }

  return(
    <ChallengesContext.Provider value={{level, currentExperience, challengesCompleted, experienceToNextLevel, activeChallenge, completeChallenge, levelUp, startNewChallenge, resetChallenge}}>
      {children}
    </ChallengesContext.Provider>
  )

}
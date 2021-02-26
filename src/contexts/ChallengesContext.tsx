import { createContext, useState, ReactNode } from 'react'

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
  resetChallenge: () => void
}

interface ChallengesProviderProps{
  children: ReactNode
}

export const ChallengeContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({children}: ChallengesProviderProps){
  const [level, setLevel] = useState(1)
  const [currentExperience, setCurrentExperience] = useState(0)
  const [challengesCompleted, setChallengesCompleted] = useState(0)
  const [activeChallenge, setActiveChallenge] = useState(null)

  const experienceFactor = 4
  const experienceToNextLevel = Math.pow((level+1) * experienceFactor, 2)

  function levelUp(){
    setLevel(level + 1)
  }

  function startNewChallenge(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]
    setActiveChallenge(challenge)
  }

  function resetChallenge(){
    setActiveChallenge(null)
  }

  return(
    <ChallengeContext.Provider value={{level, currentExperience, challengesCompleted, experienceToNextLevel, activeChallenge, levelUp, startNewChallenge, resetChallenge}}>
      {children}
    </ChallengeContext.Provider>
  )

}
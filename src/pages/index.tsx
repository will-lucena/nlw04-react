import Head from "next/head";
import {GetServerSideProps} from 'next'
import { ChallengeBox } from "../components/ChallengeBox";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import Profile from "../components/Profile";
import { CountdownProvider } from "../contexts/CountdownContext";

import styles from '../styles/components/Home.module.css'
import { ChallengesProvider } from "../contexts/ChallengesContext";

interface HomeProps{
  level: Number,
  currentExperience: Number,
  challengesCompleted: Number
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider 
      level={props.level} 
      currentExperience={props.currentExperience} 
      challengesCompleted={props.challengesCompleted}>
        <div className={styles.container}>

        <Head>
          <title>Home - MoveIt</title>
        </Head>
        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps:GetServerSideProps = async (context) => {

  const {level, currentExperience, challengesCompleted} = context.req.cookies

  return {
    props:{
      level: Number(level), 
      currentExperience: Number(currentExperience), 
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
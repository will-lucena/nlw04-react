import styles from '../styles/components/Profile.module.css'

export default function Profile(){
  return(
      <div className={styles.container}>
        <img src="https://github.com/will-lucena.png" alt="Will Lucena"/>
        <div>
          <strong>Will Lucena</strong>
          <p>
            <img src="icons/level.svg" alt="level icon"/>
            Level 1
          </p>
        </div>
      </div>
    )
}
import { Stat, StatLabel, StatNumber } from '@chakra-ui/react'

import styles from './stats.module.scss'
import { useGuesses } from 'entities/guesses/api'
import { useUsersMe } from 'entities/users/api'

export const Stats = () => {
  const { data: guesses } = useGuesses()
  const { data: usersMe } = useUsersMe()

  return (
    <>
      <div className={styles.wrapper}>
        <Stat>
          <StatLabel>Игра</StatLabel>
          <StatNumber>#{usersMe?.id}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Попыток</StatLabel>
          <StatNumber>{guesses?.length}</StatNumber>
        </Stat>
      </div>
    </>
  )
}

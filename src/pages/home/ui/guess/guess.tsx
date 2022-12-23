import { Card, CardBody, Text } from '@chakra-ui/react'

import styles from './guess.module.scss'
import classNames from 'classnames'

interface GuessProps extends Pick<Components.Schemas.Guess, `text`> {
  similarity?: Components.Schemas.Guess[`similarity`]
  rank?: Components.Schemas.Guess[`rank`]
}

const getBackgroundClassName = (similarity: number) => {
  if (similarity > 0.7) {
    return styles.similarity_green500
  } else if (similarity > 0.3) {
    return styles.similarity_orange500
  } else {
    return styles.similarity_red500
  }
}

export const Guess = ({ text, similarity = 0, rank }: GuessProps) => {
  return (
    <>
      <Card size='sm'>
        <span
          style={{ width: `${similarity * 100}%` }}
          className={classNames(
            styles.similarity,
            getBackgroundClassName(similarity),
          )}
        />
        <CardBody className={styles.body}>
          <Text
            className={styles.text}
            casing={rank !== undefined ? `capitalize` : undefined}
          >
            {text}
          </Text>
          <Text className={styles.text}>{rank}</Text>
        </CardBody>
      </Card>
    </>
  )
}

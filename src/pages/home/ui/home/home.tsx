import { Heading, Input } from '@chakra-ui/react'

import styles from './home.module.scss'
import { useGuesses } from 'entities/guesses/api'
import { Guess } from 'pages/home/ui/guess'
import { useHandleGuess } from 'pages/home/lib'
import React, { useCallback, useEffect, useState } from 'react'
import { WinCard } from '../win-card'
import { Stats } from 'pages/home/ui/stats'

export const Home = () => {
  const { data: guesses } = useGuesses()
  const handleGuess = useHandleGuess()
  const [text, setText] = useState(``)
  const [lastWord, setLastWord] = useState<Components.Schemas.Guess>()
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isWon, setIsWon] = useState(false)

  const handleKeyDown = useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === `Enter`) {
        setLastWord(undefined)
        try {
          setIsLoading(true)
          setIsError(false)
          setLastWord(undefined)
          setText(``)
          const word = await handleGuess({
            text: text.toLowerCase().replace(`ё`, `е`),
          })
          setLastWord(word)
        } catch (e) {
          console.error(e)
          setIsError(true)
        } finally {
          setIsLoading(false)
        }
      }
    },
    [handleGuess, text],
  )

  useEffect(() => {
    if (guesses?.some(({ rank }) => rank === 0)) {
      setIsWon(true)
    }
  }, [guesses])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value)
    },
    [],
  )

  return (
    <>
      <div className={styles.wrapper}>
        <Heading textAlign='center' className={styles.title}>
          WordGuess
        </Heading>
        {isWon && <WinCard className={styles.winCard} />}
        <Stats />
        <Input
          className={styles.input}
          placeholder='Введите слово'
          size='lg'
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          value={text}
        />
        <div className={styles.lastWordWrapper}>
          {isLoading && <Guess text='Расчитываем...' />}
          {!isLoading && isError && <Guess text='Такого слова нет' />}
          {!isLoading && !isError && lastWord && (
            <Guess
              text={lastWord.text}
              rank={lastWord.rank}
              similarity={lastWord.similarity}
            />
          )}
          {!isLoading && !isError && !lastWord && (
            <Guess text='Введите слово' />
          )}
        </div>
        <div className={styles.wordsWrapper}>
          {guesses?.map((guess) => (
            <Guess
              key={guess.id}
              text={guess.text}
              similarity={guess.similarity}
              rank={guess.rank}
            />
          ))}
        </div>
      </div>
    </>
  )
}

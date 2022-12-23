import {
  Card,
  Heading,
  CardBody,
  Text,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useGuesses } from 'entities/guesses/api'
import moment from 'moment'

const declareNumber = (number: number, words: [string, string, string]) => {
  return words[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? number % 10 : 5]
  ]
}

interface WinCardProps {
  className?: string
}

export const WinCard = ({ className }: WinCardProps) => {
  const { data: guesses } = useGuesses()
  const [timeString, setTimeString] = useState(``)

  useEffect(() => {
    const endDate = +new Date().setUTCHours(24, 0, 0, 0)

    const diff = Math.abs(endDate - +new Date())
    setTimeString(moment(diff).utcOffset(0).format(`HH:mm:ss`))

    const timer = setInterval(() => {
      const diff = Math.abs(endDate - +new Date())
      setTimeString(moment(diff).utcOffset(0).format(`HH:mm:ss`))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Card className={className}>
      <CardBody>
        <Stack>
          <Heading size='md'>Победа!</Heading>
          {guesses && (
            <Text>
              Вы угадали слово за {guesses.length}{' '}
              {declareNumber(guesses.length, [`попытку`, `попытки`, `попыток`])}
            </Text>
          )}
        </Stack>

        <Stat style={{ marginTop: 12 }}>
          <StatLabel>Следующее слово через</StatLabel>
          <StatNumber>{timeString}</StatNumber>
        </Stat>
      </CardBody>
    </Card>
  )
}

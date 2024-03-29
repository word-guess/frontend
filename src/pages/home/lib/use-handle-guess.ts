import { useCallback } from 'react'
import { postGuess, useGuesses } from 'entities/guesses/api'

export const useHandleGuess = () => {
  const { data: guesses, mutate: mutateGuesses } = useGuesses()

  return useCallback(
    async (body: Paths.GuessesControllerCreate.RequestBody) => {
      const { data } = await postGuess(body)

      if (guesses) {
        await mutateGuesses(
          (oldGuesses) => {
            if (!oldGuesses) {
              return
            }

            const newGuesses = [...oldGuesses]

            if (guesses.some(({ rank }) => rank === data.rank)) {
              return newGuesses
            }

            const index = guesses.findIndex(({ rank }) => rank > data.rank)
            if (index === -1) {
              newGuesses.push(data)
            } else {
              newGuesses.splice(index, 0, data)
            }

            return newGuesses
          },
          { revalidate: false },
        )
      } else {
        await mutateGuesses()
      }

      return data
    },
    [guesses, mutateGuesses],
  )
}

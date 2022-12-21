import useSWR from 'swr'
import { backendApi, routes } from 'shared/api'

export const useGuesses = () => {
  return useSWR<Paths.GuessesControllerFindAll.Responses.$200>(routes.guesses)
}

export const postGuess = (body: Paths.GuessesControllerCreate.RequestBody) => {
  return backendApi.post<Paths.GuessesControllerCreate.Responses.$201>(
    routes.guesses,
    body,
  )
}

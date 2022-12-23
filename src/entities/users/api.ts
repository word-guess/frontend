import useSWR from 'swr'
import { routes } from 'shared/api'

export const useUsersCount = () => {
  return useSWR<Paths.UsersControllerCount.Responses.$200>(routes.usersCount)
}

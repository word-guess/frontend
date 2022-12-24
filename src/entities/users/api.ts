import useSWR from 'swr'
import { routes } from 'shared/api'

export const useUsersMe = () => {
  return useSWR<Paths.UsersControllerMe.Responses.$200>(routes.usersMe)
}

import { Home } from 'pages/home/ui'
import { useEffect } from 'react'
import { useColorMode } from '@chakra-ui/react'

export const App = () => {
  const { setColorMode } = useColorMode()

  useEffect(() => {
    setColorMode(
      window.matchMedia?.(`(prefers-color-scheme: dark)`)?.matches
        ? `dark`
        : `light`,
    )
  }, [setColorMode])

  return <Home />
}

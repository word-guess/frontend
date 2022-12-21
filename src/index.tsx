import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { SWRConfig } from 'swr'

import { App } from 'app/ui'
import { backendSWRFetcher } from 'shared/api'

const theme = extendTheme({
  config: {
    useSystemColorMode: true,
    colorModeManager: null,
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <SWRConfig value={{ fetcher: backendSWRFetcher }}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </SWRConfig>
  </React.StrictMode>,
)

import React from 'react'

import { StylesProvider, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import RouterPage from './RouterPage'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff0000'
    },
    secondary: {
      main: '#414141'
    }
  },
})

function Theme() {
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider>
        <RouterPage />
      </StylesProvider>
    </ThemeProvider>
  )
}

export default Theme

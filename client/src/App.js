import React, { useState } from 'react'
import { Container, CssBaseline, ThemeProvider } from '@material-ui/core'

import Menu from './components/Menu'
import ProductList from './components/ProductList'
import theme from './theme'

const App = () => {
  const [category, setCategory] = useState('gloves')

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Menu category={category} setCategory={setCategory} />
      <Container maxWidth="xl">
        <ProductList category={category} />
      </Container>
    </ThemeProvider>
  )
}

export default App

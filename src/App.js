import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container, CssBaseline, ThemeProvider } from '@material-ui/core'

import Menu from './components/Menu'
import ProductList from './components/ProductList'
import theme from './theme'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Menu />
      <Container>
        <Switch>
          <Route path="/" exact>
            <ProductList category="gloves" />
          </Route>
          <Route path="/facemasks" exact>
            <ProductList category="facemasks" />
          </Route>
          <Route path="/beanies" exact>
            <ProductList category="beanies" />
          </Route>
        </Switch>
      </Container>
    </ThemeProvider>
  )
}

export default App

import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container, CssBaseline } from '@material-ui/core'

import Menu from './components/Menu'
import ProductList from './components/ProductList'

const App = () => {
  return (
    <>
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
    </>
  )
}

export default App

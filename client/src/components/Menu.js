import React from 'react'
import PropTypes from 'prop-types'
import { AppBar, Tabs, Tab } from '@material-ui/core'

const MenuTabs = ({ category = 'gloves', setCategory }) => {
  return (
    <Tabs value={category} onChange={(event, value) => setCategory(value)}>
      <Tab value="gloves" label="Gloves" />
      <Tab value="facemasks" label="Facemasks" />
      <Tab value="beanies" label="Beanies" />
    </Tabs>
  )
}

const Menu = (props) => {
  return (
    <AppBar position="static">
      <MenuTabs {...props} />
    </AppBar>
  )
}

Menu.propTypes = {
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
}

MenuTabs.propTypes = {
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
}

export default Menu

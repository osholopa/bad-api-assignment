import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AppBar, Tabs, Tab } from '@material-ui/core'

const MenuTabs = () => {
  const history = useHistory()
  const [value, setValue] = useState(history.location.pathname)

  const handleChange = (event, value) => {
    setValue(value)
    history.push(value)
  }

  return (
    <Tabs value={value} onChange={handleChange}>
      <Tab value="/" label="Gloves" />
      <Tab value="/facemasks" label="Facemasks" />
      <Tab value="/beanies" label="Beanies" />
    </Tabs>
  )
}

const Menu = () => {
  return (
    <AppBar position="static">
      <MenuTabs />
    </AppBar>
  )
}

export default Menu

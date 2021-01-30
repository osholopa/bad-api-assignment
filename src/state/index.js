import React, { useReducer } from 'react'

import reducer from './reducer'

const initialState = {
  gloves: {},
  facemasks: {},
  beanies: {},
}

export const StateContext = React.createContext(initialState)

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  )
}

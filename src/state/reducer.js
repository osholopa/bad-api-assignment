const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCTS':
      return {
        ...state,
        [action.payload.category]: action.payload.products,
      }
    default:
      return state
  }
}

export default reducer

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCTS':
      return {
        ...state,
        [action.payload.category]: action.payload.products,
      }
    case 'ADD_AVAILABILITY':
      return {
        ...state,
        [action.payload.manufacturer]: action.payload.data,
      }
    default:
      return state
  }
}

export default reducer

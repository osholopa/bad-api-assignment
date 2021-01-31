export const addProducts = (category, products) => {
  return {
    type: 'ADD_PRODUCTS',
    payload: {
      category: category,
      products: products,
    },
  }
}

export const addAvailability = (manufacturer, data) => {
  return {
    type: 'ADD_AVAILABILITY',
    payload: { manufacturer: manufacturer, data: data.response },
  }
}

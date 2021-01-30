export const addProducts = (category, products) => {
  return {
    type: 'ADD_PRODUCTS',
    payload: {
      category: category,
      products: products,
    },
  }
}

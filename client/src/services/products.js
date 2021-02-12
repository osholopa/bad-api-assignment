const baseUrl = 'api/products'

const getByCategory = async (category) => {
  const url = `${baseUrl}/${category}`
  const response = await fetch(url)
  const data = await response.json()
  return data
}

export default { getByCategory }

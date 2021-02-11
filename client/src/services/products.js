const baseUrl = `${process.env.REACT_APP_PROXY_URI}/products`

const getByCategory = async (category) => {
  const url = `${baseUrl}/${category}`
  const response = await fetch(url)
  const data = await response.json()
  return data
}

export default { getByCategory }

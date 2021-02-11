const baseUrl = `${process.env.REACT_APP_API_URI}/products`
const proxyUrl = `${process.env.REACT_APP_PROXY_URI}`

const getByCategory = async (category) => {
  const url = `${baseUrl}/${category}`
  const response = await fetch(proxyUrl + url)
  const data = await response.json()
  return data
}

export default { getByCategory }

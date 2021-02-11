const baseUrl = `${process.env.REACT_APP_API_URI}/availability`
const proxyUrl = `${process.env.REACT_APP_PROXY_URI}`

const getByManufacturer = async (manufacturer) => {
  const url = `${baseUrl}/${manufacturer}`
  const response = await fetch(proxyUrl + url)
  const data = await response.json()
  return data
}

export default { getByManufacturer }

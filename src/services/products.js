import axios from 'axios'

const baseUrl = 'https://bad-api-assignment.reaktor.com/v2/products'

const getByCategory = async (category) => {
  const response = await axios.get(`${baseUrl}/${category}`)
  return response
}

export default { getByCategory }

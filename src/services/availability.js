import axios from 'axios'

const baseUrl = `${process.env.REACT_APP_API_URI}/availability`

const getByManufacturer = async (manufacturer) => {
  const response = await axios.get(`${baseUrl}/${manufacturer}`)
  return response
}

export default { getByManufacturer }

const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const xml2js = require('xml2js')
const app = express()

app.use(cors())

function uniquePredicate(value, index, self) {
  return self.indexOf(value) === index
}

async function addAvailabilityTo(products) {
  const manufacturers = products
    .map((p) => p.manufacturer)
    .filter(uniquePredicate)

  try {
    const availabilityRequests = manufacturers.map((manufacturer) =>
      axios.get(`${config.API_URL}/availability/${manufacturer}`)
    )

    console.log('getting availability')
    const availabilityResponses = await Promise.all(availabilityRequests)
    const manufacturerAvailabilityPromises = availabilityResponses.map(
      async (item, index) => {
       
        const xmlPromises = item.data.response.map(async (product) => ({
          id: String(product.id).toLowerCase(),
          availability: (await xml2js.parseStringPromise(product.DATAPAYLOAD))
            .AVAILABILITY.INSTOCKVALUE[0],
        }))
        const availabilities = await Promise.all(xmlPromises)
        return availabilities
      }
    )
    const manufacturerAvailabilities = await Promise.all(
      manufacturerAvailabilityPromises
    )

    const availabilityDictionary = manufacturerAvailabilities.reduce(
      (acc, availabilities, index) => ({
        ...acc,
        [manufacturers[index]]: availabilities,
      }),
      {}
    )

    return products.map((product) => ({
      ...product,
      availability: availabilityDictionary[product.manufacturer].find(
        (availability) => availability.id === product.id
      ).availability,
    }))

  } catch (err) {
    console.log('Error: ', err)
  }
}

async function fetchProducts(category) {
  const response = await axios.get(`${config.API_URL}/products/${category}`)
  return response.data
}

app.get('/products/:category', async (req, res) => {
  const { category } = req.params
  const products = await fetchProducts(category)

  res.json(await addAvailabilityTo(products))
})

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
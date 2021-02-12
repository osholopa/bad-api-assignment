const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const axios = require('axios')
const xml2js = require('xml2js')
const app = express()
const redis = require('redis')

app.use(cors())
app.use(express.static('build'))

const PORT = config.PORT
const REDIS_CONFIG = config.REDIS_CONFIG
const client = redis.createClient(REDIS_CONFIG)

function uniquePredicate(value, index, self) {
  return self.indexOf(value) === index
}

async function validateResponses(manufacturers, responses) {
  const validatedResponsePromises = responses.map(async (response, index) => {
    let validatedResponse = response
    while (validatedResponse.data.response === '[]') {
      validatedResponse = await axios.get(
        `${config.API_URL}/availability/${manufacturers[index]}`
      )
    }
    return validatedResponse
  })
  const validatedResponses = await Promise.all(validatedResponsePromises)
  return validatedResponses
}

async function addAvailabilityTo(products) {
  const manufacturers = products
    .map((p) => p.manufacturer)
    .filter(uniquePredicate)

  try {
    const availabilityRequests = manufacturers.map((manufacturer) =>
      axios.get(`${config.API_URL}/availability/${manufacturer}`)
    )

    const availabilityResponses = await Promise.all(availabilityRequests)
    const validatedResponses = await validateResponses(
      manufacturers,
      availabilityResponses
    )
    const manufacturerAvailabilityPromises = validatedResponses.map(
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

    //Set data to redis
    client.setex(
      'availabilityDictionary',
      300,
      JSON.stringify(availabilityDictionary)
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
  client.setex(category, 300, JSON.stringify(response.data))
  return response.data
}

//Product cache middleware
async function productCache(req, res, next) {
  const { category } = req.params
  client.get(category, async (err, data) => {
    if (err) throw err
    if (data !== null) {
      req.products = JSON.parse(data)
      next()
    } else {
      req.products = await fetchProducts(category)
      next()
    }
  })
}

//Availability cache middleware
async function availabilityCache(req, res, next) {
  client.get('availabilityDictionary', (err, data) => {
    if (err) throw err
    if (data !== null) {
      const availabilityDictionary = JSON.parse(data)
      const products = req.products

      const productsWithAvailability = products.map((product) => ({
        ...product,
        availability: availabilityDictionary[product.manufacturer].find(
          (availability) => availability.id === product.id
        ).availability,
      }))
      res.json(productsWithAvailability)
    } else {
      next()
    }
  })
}

app.get(
  '/api/products/:category',
  productCache,
  availabilityCache,
  async (req, res) => {
    const { category } = req.params
    const products = await fetchProducts(category)
    res.json(await addAvailabilityTo(products))
  }
)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

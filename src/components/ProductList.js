import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@material-ui/data-grid'
import { CircularProgress, Box, makeStyles } from '@material-ui/core'

import productService from '../services/products'
import { StateContext } from '../state'
import { addProducts } from '../state/actions'
import utils from '../utils/'
import CheckAvailability from './CheckAvailability'

const useStyles = makeStyles(() => ({
  container: {
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const ProductList = ({ category }) => {
  const { state, dispatch } = useContext(StateContext)
  const [selected, setSelected] = useState(null)
  const classes = useStyles()

  useEffect(() => {
    const fetchProducts = async () => {
      if (utils.isEmpty(state[category])) {
        try {
          const response = await productService.getByCategory(category)
          dispatch(addProducts(category, response))
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchProducts()
  }, [category])

  const handleSelect = (selection) => {
    setSelected(selection.data)
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'manufacturer', headerName: 'Manufacturer', width: 150 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'color', headerName: 'Color', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 },
    { field: 'type', headerName: 'Type', width: 130 },
  ]

  if (utils.isEmpty(state[category]))
    return (
      <Box className={classes.container}>
        <CircularProgress style={{ margin: '0px auto' }} />
      </Box>
    )

  return (
    <Box className={classes.container}>
      <div style={{ height: '80%', width: '100%' }}>
        <DataGrid
          onRowSelected={handleSelect}
          rows={state[category]}
          columns={columns}
          pageSize={100}
        />
      </div>
      <CheckAvailability product={selected} />
    </Box>
  )
}

ProductList.propTypes = {
  category: PropTypes.string.isRequired,
}

export default ProductList

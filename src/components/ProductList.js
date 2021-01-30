import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@material-ui/data-grid'
import { CircularProgress } from '@material-ui/core'

import productService from '../services/products'
import { StateContext } from '../state'
import { addProducts } from '../state/actions'
import utils from '../utils/'

const ProductList = ({ category }) => {
  const { state, dispatch } = useContext(StateContext)

  useEffect(() => {
    const fetchProducts = async () => {
      if (utils.isEmpty(state[category])) {
        try {
          const response = await productService.getByCategory(category)
          if (response.status === 200) {
            dispatch(addProducts(category, response.data))
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchProducts()
  }, [category])

  const columns = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'type', headerName: 'Type', width: 130 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'color', headerName: 'Color', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 },
    { field: 'manufacturer', headerName: 'Manufacturer', width: 150 },
  ]

  if (utils.isEmpty(state[category])) return <CircularProgress />

  return (
    <div style={{ height: '90vh', width: '90vw' }}>
      <DataGrid rows={state[category]} columns={columns} pageSize={100} />
    </div>
  )
}

ProductList.propTypes = {
  category: PropTypes.string.isRequired,
}

export default ProductList

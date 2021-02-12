import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@material-ui/data-grid'
import { CircularProgress, Box, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import productService from '../services/products'

const useStyles = makeStyles(() => ({
  root: {
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& .availability.positive': {
      backgroundColor: '#07ad0f',
      color: '#032d05',
    },
    '& .availability.negative': {
      backgroundColor: '#c9021d',
      color: '#fafafa',
    },
    '& .availability.neutral': {
      backgroundColor: '#f2d40c',
      color: '#756602',
    },
  },
}))

export const ProductList = ({ columns, rows, ...props }) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={100}
      checkboxSelection={false}
      {...props}
    />
  )
}

const ProductListContainer = ({ category }) => {
  const [products, setProducts] = useState([])
  const classes = useStyles()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getByCategory(category)
        setProducts(response)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProducts()
  }, [category])

  const columns = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'manufacturer', headerName: 'Manufacturer', width: 150 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'color', headerName: 'Color', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 },
    {
      field: 'availability',
      headerName: 'Availability',
      width: 130,
      cellClassName: (params) =>
        clsx('availability', {
          positive: params.value === 'INSTOCK',
          negative: params.value === 'OUTOFSTOCK',
          neutral: params.value === 'LESSTHAN10',
        }),
    },
    { field: 'type', headerName: 'Type', width: 130 },
  ]

  if (products.length === 0)
    return (
      <Box className={classes.root}>
        <CircularProgress style={{ margin: '0px auto' }} />
      </Box>
    )

  return (
    <Box className={classes.root}>
      <div style={{ height: '90%', width: '100%' }}>
        <ProductList columns={columns} rows={products} />
      </div>
    </Box>
  )
}

ProductList.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  autoHeight: PropTypes.bool,
  selected: PropTypes.object,
}

ProductListContainer.propTypes = {
  category: PropTypes.string.isRequired,
}

export default ProductListContainer

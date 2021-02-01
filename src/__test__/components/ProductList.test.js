import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, act, screen } from '@testing-library/react'
import { ProductList } from '../../components/ProductList'

import { createMount } from '@material-ui/core/test-utils'

describe('ProductList', () => {
  let columns
  let rows
  let mount

  beforeAll(() => {
    columns = [
      { field: 'id', headerName: 'ID' },
      { field: 'manufacturer', headerName: 'Manufacturer' },
      { field: 'name', headerName: 'Name' },
      { field: 'color', headerName: 'Color' },
      { field: 'price', headerName: 'Price' },
      { field: 'type', headerName: 'Type' },
    ]
    rows = [
      {
        id: 'c214070ab34043ea2dc55e8',
        type: 'beanies',
        name: 'EMAKMO ROOM',
        color: ['black'],
        price: 378,
        manufacturer: 'abiplos',
      },
    ]
    mount = createMount({ mount: render })
  })

  test('renders correct amount of cells', async () => {
    await act(async () => {
      mount(
        <ProductList
          rows={rows}
          columns={columns}
          autoHeight
          columnBuffer={6}
        />
      )
    })
    expect(await screen.findAllByRole('cell')).toHaveLength(6)
  })

  test('renders correct data', async () => {
    await act(async () => {
      mount(
        <ProductList
          rows={rows}
          columns={columns}
          autoHeight
          columnBuffer={6}
        />
      )
    })

    expect(await screen.findByText('c214070ab34043ea2dc55e8')).toBeDefined()
    expect(await screen.findByText('beanies')).toBeDefined()
    expect(await screen.findByText('EMAKMO ROOM')).toBeDefined()
    expect(await screen.findByText('black')).toBeDefined()
    expect(await screen.findByText('378')).toBeDefined()
    expect(await screen.findByText('abiplos')).toBeDefined()
  })
})

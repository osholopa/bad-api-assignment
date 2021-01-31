import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

import availabilityService from '../services/availability'
import { StateContext } from '../state'
import { addAvailability } from '../state/actions'

import utils from '../utils'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  marginTop: {
    marginTop: 20,
  },
}))

const CheckAvailability = ({ product }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [result, setResult] = React.useState(null)

  const [loading, setLoading] = React.useState(false)

  const { state, dispatch } = useContext(StateContext)

  const foundFromState = (product) => {
    if (state[product.manufacturer]) {
      return state[product.manufacturer].find((obj) => (obj.id = product.id))
    }
    return null
  }

  const fetchAvailability = async (product) => {
    let response = await availabilityService.getByManufacturer(
      product.manufacturer
    )
    while (response.data.response === '[]') {
      response = await availabilityService.getByManufacturer(
        product.manufacturer
      )
    }
    dispatch(addAvailability(product.manufacturer, response.data))
    const resultObject = response.data.response.find(
      (obj) => (obj.id = product.id)
    )
    return utils.parseAvailability(resultObject.DATAPAYLOAD)
  }

  const handleClose = () => {
    setOpen(false)
    setResult(null)
  }

  const handleSubmit = async () => {
    setOpen(true)
    try {
      if (product) {
        handleClose()
        setLoading(true)
        const found = foundFromState(product)
        if (found) {
          setLoading(false)
          setOpen(true)
          const availability = utils.parseAvailability(found.DATAPAYLOAD)
          setResult(availability)
        } else {
          const availability = await fetchAvailability(product)
          setResult(availability)
        }
        setLoading(false)
        setOpen(true)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  return (
    <div>
      <Button
        className={classes.marginTop}
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!product}
      >
        CHECK PRODUCT AVAILABILITY
      </Button>
      <Backdrop
        className={classes.backdrop}
        open={loading}
        onClick={() => setLoading(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Availability result</DialogTitle>
        <DialogContent>
          {result ? (
            <div>
              {Object.keys(product).map((key) => (
                <DialogContentText key={key}>
                  {key.toUpperCase()}: {product[key]}
                </DialogContentText>
              ))}
              <DialogContentText>AVAILABILITY: {result}</DialogContentText>
            </div>
          ) : null}
        </DialogContent>
        <DialogActions>
          {result ? (
            <div>
              <Button onClick={handleClose} color="primary">
                Ok
              </Button>
            </div>
          ) : null}
        </DialogActions>
      </Dialog>
    </div>
  )
}

CheckAvailability.propTypes = {
  product: PropTypes.object,
}

export default CheckAvailability

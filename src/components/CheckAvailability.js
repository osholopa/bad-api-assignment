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
  red: { color: theme.palette.error.main },
  yellow: { color: theme.palette.warning.main },
  green: { color: theme.palette.success.main },
}))

const CheckAvailability = ({ product }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [result, setResult] = React.useState(null)

  const [loading, setLoading] = React.useState(false)

  const { state, dispatch } = useContext(StateContext)

  const foundFromState = (product) => {
    if (state[product.manufacturer]) {
      return state[product.manufacturer].find(
        (obj) =>
          String(obj.id).toUpperCase() === String(product.id).toUpperCase()
      )
    }
    return null
  }

  const fetchAvailability = async (product) => {
    let data = await availabilityService.getByManufacturer(product.manufacturer)
    while (data.response === '[]') {
      data = await availabilityService.getByManufacturer(product.manufacturer)
    }
    dispatch(addAvailability(product.manufacturer, data))
    const resultObject = data.response.find(
      (obj) => String(obj.id).toUpperCase() === String(product.id).toUpperCase()
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

  let resultColor = 'green'

  switch (result) {
    case 'OUTOFSTOCK':
      resultColor = 'red'
      break
    case 'LESSTHAN10':
      resultColor = 'yellow'
      break
    default:
      break
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
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {result ? (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Availability check result
          </DialogTitle>
          <DialogContent>
            <div>
              {Object.keys(product).map((key) => (
                <DialogContentText key={key}>
                  {key.toUpperCase()}: {product[key]}
                </DialogContentText>
              ))}
              <DialogContentText className={classes[resultColor]}>
                AVAILABILITY: {result}
              </DialogContentText>
            </div>
          </DialogContent>
          <DialogActions>
            <div>
              <Button onClick={handleClose} color="primary">
                Ok
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      ) : null}
    </div>
  )
}

CheckAvailability.propTypes = {
  product: PropTypes.object,
}

export default CheckAvailability

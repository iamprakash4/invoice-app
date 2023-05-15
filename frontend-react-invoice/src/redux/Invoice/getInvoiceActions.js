import axios from 'axios'

export const fetchInvoice = () => {
  return (dispatch) => {
    dispatch(fetchInvoiceRequest())
    axios
      .get('http://localhost:4000/invoice')
      .then(response => {
        const invoice = response.data
        setTimeout(() => {  // to emulate some network delay
          dispatch(fetchInvoiceSuccess(invoice))
        }, 2000)
      })
      .catch(error => {
        dispatch(fetchInvoiceFailure(error.message))
      })
  }
}

export const fetchInvoiceRequest = () => {
  return {
    type: 'FETCH_INVOICE_REQUEST'
  }
}

export const fetchInvoiceSuccess = invoice => {
  return {
    type: 'FETCH_INVOICE_SUCCESS',
    payload: invoice
  }
}

export const fetchInvoiceFailure = error => {
  return {
    type: 'FETCH_INVOICE_FAILURE',
    payload: error
  }
}

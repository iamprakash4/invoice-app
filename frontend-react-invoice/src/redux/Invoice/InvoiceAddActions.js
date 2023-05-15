import axios from 'axios'

export const InvoiceAdd = (payload) => {
  return (dispatch) => {
    dispatch(InvoiceAddRequest())
    axios
      .put('http://localhost:4000/invoice', {data: payload})
      .then(response => {
        const invoice = response.data
        setTimeout(() => {  // to emulate some network delay
          dispatch(InvoiceAddSuccess(invoice))
        }, 2000)
      })
      .catch(error => {
        dispatch(InvoiceAddFailure(error.message))
      })
  }
}

export const InvoiceAddRequest = () => {
  return {
    type: 'ADD_INVOICE_REQUEST'
  }
}

export const InvoiceAddSuccess = invoice => {
  return {
    type: 'ADD_INVOICE_SUCCESS',
    payload: invoice
  }
}

export const InvoiceAddFailure = error => {
  return {
    type: 'ADD_INVOICE_FAILURE',
    payload: error
  }
}

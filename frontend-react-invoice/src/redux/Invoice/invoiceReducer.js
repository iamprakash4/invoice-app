const initialState = {
  loading: false,
  invoices: [],
  error: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_INVOICE_REQUEST':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_INVOICE_SUCCESS':
      return {
        loading: false,
        invoices: action.payload,
        error: ''
      }
    case 'FETCH_INVOICE_FAILURE':
      return {
        loading: false,
        invoices: [],
        error: action.payload
      }
    default: return state
  }
}

export default reducer

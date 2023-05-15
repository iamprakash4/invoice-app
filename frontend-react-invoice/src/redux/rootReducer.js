import { combineReducers } from 'redux'
import GetInvoiceReducer from './Invoice/invoiceReducer'

const rootReducer = combineReducers({
  invoice: GetInvoiceReducer
})

export default rootReducer

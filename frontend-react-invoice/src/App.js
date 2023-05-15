import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import { InvoicesContainer } from './components/InvoiceContainer'

function App () {
  return (
    <Provider store={store}>
      <InvoicesContainer />
    </Provider>
  )
}

export default App

import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router-dom'

export default function withConfiguredForTesting(WrappedComponent) {
  const mockStore = configureStore([])
  const store = mockStore({})

  return props => (
    <Provider store={store}>
      <MemoryRouter>
        <WrappedComponent {...props} />
      </MemoryRouter>
    </Provider>
  )
}

import 'core-js/features/array'
import 'core-js/features/number'
import 'core-js/features/string'
import 'core-js/features/object'
import 'core-js/features/promise'
import 'react-app-polyfill/ie11'
import 'raf/polyfill'

import React from 'react'
import { hydrate, render } from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import './index.css'
import App from 'components/App'
import { PersistGate } from 'redux-persist/integration/react'

import { configureStore } from './configs/redux.config'
import { environments } from './helpers/environments.helper'

environments.ensure().then(() => {
  const rootNode = document.getElementById('root')
  const { store, persistor } = configureStore()

  console.info('You are running version', process.env.REACT_APP_VERSION || '[DEBUG]')

  init(rootNode.hasChildNodes() ? hydrate : render)
  setUpHotReload()

  function init(renderer) {
    renderer(
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </ReduxProvider>
      , rootNode, onLoaded)
  }

  function onLoaded() { }

  function setUpHotReload() {
    if (process.env.NODE_ENV !== 'production' && module && module.hot) {
      module.hot.accept('./components/App', e => {
        console.log('[HMR] Replacing app...', e)
        init(render)
      })
    }
  }
})

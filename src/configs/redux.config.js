import { applyMiddleware, createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import localForage from 'localforage'
import thunk from 'redux-thunk'

import reducers from 'duck/reducers'

const persistConfig = {
  key: 'image-gallery',
  storage: localForage,
  blacklist: ['router']
}

const getRootReducer = () => persistReducer(persistConfig, reducers)

export function configureStore() {
  const enhancer = composeWithDevTools(applyMiddleware(thunk))
  const store = createStore(getRootReducer(), enhancer)
  const persistor = persistStore(store)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../duck/reducers', () => {
      console.log('[HMR] Replacing reducers...')
      store.replaceReducer(getRootReducer())
    })
  }

  return { store, persistor }
}

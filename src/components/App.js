import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'

import { INITIALIZED } from 'duck/reducers/app'

import themes, { overrides } from '../themes'
import Layout from './Layout/Layout'
import Error from '../pages/error/Error'

const theme = createMuiTheme({ ...themes.default, ...overrides })

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch({ type: INITIALIZED })
    return () => { }
  }, [dispatch])

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/app/dashboard' />} />
          <Route exact path='/app' render={() => <Redirect to='/app/dashboard' />} />
          <Route path='/app' component={Layout} />
          <Route component={Error} />
          <Redirect to={'/'} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  )
}

export default App

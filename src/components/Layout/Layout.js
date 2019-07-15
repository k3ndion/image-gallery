import React, { useState } from 'react'
import { CssBaseline } from '@material-ui/core'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import classnames from 'classnames'

import Header from 'components/Header/Header'
import Sidebar from 'components/Sidebar/Sidebar'
import Dashboard from 'pages/dashboard/Dashboard'

import { useStyles } from './styles'

const Layout = () => {
  const classes = useStyles()
  const [isSidebarOpened, setIsSidebarOpened] = useState(false)
  const toggleSidebar = ()=>setIsSidebarOpened(!isSidebarOpened)

  return  (
  <div className={classes.root}>
    <CssBaseline />
    <BrowserRouter>
      <React.Fragment>
        <Header {...isSidebarOpened}/>
        <Sidebar {...isSidebarOpened} {...toggleSidebar}/>
        <div className={classnames(classes.content, { [classes.contentShift]: false })}>
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path='/app/dashboard' component={Dashboard} />
            <Redirect to='/app/dashboard' />
          </Switch>
        </div>
      </React.Fragment>
    </BrowserRouter>
  </div>
)}

export default Layout

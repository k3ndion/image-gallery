import React from 'react'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'
import { Menu as MenuIcon, ArrowBack as ArrowBackIcon } from '@material-ui/icons'
import classNames from 'classnames'

import { TypographyExtended } from '../Wrappers/Wrappers'
import { useStyles } from './styles'

const Header = ({ isSidebarOpened }) => {
const classes = useStyles()
  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color='inherit'
          onClick={() => { }}
          className={classNames(classes.headerMenuButton, classes.headerMenuButtonCollapse)}
        >
          {isSidebarOpened
            ? (<ArrowBackIcon classes={{ root: classNames(classes.headerIcon, classes.headerIconCollapse) }} />)
            : (<MenuIcon classes={{ root: classNames(classes.headerIcon, classes.headerIconCollapse) }} />)
          }
        </IconButton>
        <TypographyExtended variant='h6' weight='medium' className={classes.logotype}>Image Gallery</TypographyExtended>
      </Toolbar>
    </AppBar>
  )
}

export default Header

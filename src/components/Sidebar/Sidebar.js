import React, { useState, useEffect } from 'react'
import { Drawer, IconButton, List } from '@material-ui/core'
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons'
import classNames from 'classnames'
import { useTheme } from '@material-ui/styles'

import { useStyles } from './styles'

const Sidebar = ({ isSidebarOpened, toggleSidebar }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [isPermanent, setPermanent] = useState(true)

  useEffect(() => {
    const handleWindowWidthChange = () => () => {
      const windowWidth = window.innerWidth
      const breakpointWidth = theme.breakpoints.values.md
      const isSmallScreen = windowWidth < breakpointWidth

      if (isSmallScreen && isPermanent) {
        setPermanent(false)
      } else if (!isSmallScreen && !isPermanent) {
        setPermanent(true)
      }
    }

    window.addEventListener('resize', handleWindowWidthChange)
    handleWindowWidthChange()

    return () => {
      window.removeEventListener('resize', handleWindowWidthChange)
    }
  })

  return (
    <Drawer
      variant={isPermanent ? 'permanent' : 'temporary'}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={toggleSidebar}>
          <ArrowBackIcon classes={{ root: classNames(classes.headerIcon, classes.headerIconCollapse) }} />
        </IconButton>
      </div>
      <List className={classes.sidebarList}></List>
    </Drawer>
  )
}

export default Sidebar

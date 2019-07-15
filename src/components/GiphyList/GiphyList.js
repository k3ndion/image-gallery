import React, { useState } from 'react'
import { GridList, GridListTile, GridListTileBar, IconButton, useMediaQuery, Dialog, AppBar, Toolbar, Slide } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import { useFetch } from 'react-hooks-fetch'
import CloseIcon from '@material-ui/icons/Close'

import { useStyles } from './styles'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const GiphyList = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(false)
  const classes = useStyles()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))
  const isTablet = useMediaQuery(theme.breakpoints.up('sm'))
  const isMobile = useMediaQuery(theme.breakpoints.up('xs'))
  const { data } = useFetch('http://api.giphy.com/v1/gifs/trending?api_key=rg9mS2BkNBWovhhiuULFiVgNp4PKt2dj&limit=20')

  const handleClose = () => setIsOpen(false)
  const previewImage = item => {
    setCurrentImage(item)
    setIsOpen(true)
  }

  const list = (data && data.data) || []
  const gridCols = isDesktop ? 4 : isTablet ? 3 : isMobile ? 2 : 3

  return (
    <>
      <GridList cellHeight={200} className={classes.gridList} cols={gridCols}>
        {list.map(item => (
          <GridListTile key={item.id} className={classes.gridItem} onClick={() => previewImage(item)}>
            <img src={item.images.fixed_height_small.url} alt={item.title} />
            <GridListTileBar
              title={item.title}
              subtitle={<span>Author: {item.username}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${item.title}`} className={classes.icon} />
              }
            />
          </GridListTile>
        ))}
      </GridList>
      {currentImage &&
        <Dialog fullScreen open={isOpen} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='Close'>
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <div className={classes.imgContainer}>
            <img src={currentImage.images.original.url} alt={currentImage.title} className={classes.fullScreenImg} />
          </div>
        </Dialog>
      }
    </>
  )
}

export default GiphyList

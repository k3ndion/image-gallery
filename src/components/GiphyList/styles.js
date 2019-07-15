import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  gridItem: {
    backgroundColor: theme.palette.background.white,
    padding: '10px !important',
  },
  imgContainer: {
    paddingTop: '56px',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    top: 0
  },
  fullScreenImg: {
    width: '100%',
    height: '99.5%'
  }
}))

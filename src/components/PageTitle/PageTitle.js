import React from 'react'
import { Button } from '@material-ui/core'

import { TypographyExtended } from '../Wrappers/Wrappers'
import { useStyles } from './styles'

const PageTitle = ({ ...props }) => {
  const classes = useStyles()
  return (< div className={classes.pageTitleContainer} >
    <TypographyExtended className={classes.typo} variant='h1' size='sm'>
      {props.title}
    </TypographyExtended>
    {props.button && (
      <Button
        classes={{ root: classes.button }}
        variant='contained'
        size='large'
        color='secondary'>
        {props.button}
      </Button>
    )}
  </div >
  )
}

export default PageTitle

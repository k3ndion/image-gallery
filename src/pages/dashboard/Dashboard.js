import React, { Suspense } from 'react'
import { Grid } from '@material-ui/core'

import GifphyList from 'components/GiphyList/GiphyList'

const Dashboard = () => {
  return (
    <Suspense fallback={<div>Loading ...</div>}>
      <React.Fragment>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <GifphyList />
          </Grid>
        </Grid>
      </React.Fragment>
    </Suspense>
  )
}

export default Dashboard

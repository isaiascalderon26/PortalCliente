import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { Hidden, Grid, Container } from '@material-ui/core'
import Footer from './Footer';
import LogIn from './LogIn'
import NoCustomer from './NoCustomer'
import NoCustomer2 from './NoCustomer2'


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50
  },
  container: {
    height: '100%',
  },
}))

const NotLogged = () => {
  const classes = useStyles()
  return (
    <Fragment>
      <Hidden smUp>
        <LogIn />
        <NoCustomer />
        <Footer />
      </Hidden>
      <Hidden xsDown>
        <Container maxWidth='lg'>
          <Grid container justify='center' spacing={4} className={classes.root} alignItems="stretch">
            <Grid item lg={4} sm={8} md={5}>
              <LogIn />
            </Grid>
            <Grid item lg={4} sm={8} md={5}>
              <NoCustomer2 />
            </Grid>
            <Grid item sm={12}>
              <Footer />
            </Grid>
          </Grid>
        </Container>

      </Hidden>
    </Fragment>
  )
}

export default NotLogged
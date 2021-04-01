import React, { Fragment, useContext, useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Card, CardMedia, Grid, Hidden } from '@material-ui/core'

import { AccountContext } from '../accounts/Accounts'

import logoCC from '../../Media/home/logoCC.jpg'
import imgPortada from '../../Media/home/portada.jpg'


const useStyles = makeStyles({
  rootLogo: {
    width: 50,
    marginTop: 10,
    marginRight: 20
  },
  mediaLogo: {
    height: 50,
  },
  root: {
    width: '100%',
    marginTop: 10,
    marginBottom: 20
  },
  media: {
    height: 400,
  },
});

const Logged = () => {
  const classes = useStyles()
  const [user, setUser] = useState(null)
  const { getSession } = useContext(AccountContext)

  useEffect(() => {
    if (user == null) {
      getSession()
        .then((data) => {
          // console.log('123', data)
          setUser(data.user)
        })
    }
  }, [user, getSession])


  return (
    <Fragment>
      <Hidden xsDown>
        <Grid container justify="flex-end">
          <Grid item>
            <Card className={classes.rootLogo} elevation={0} square={true}>
              <CardMedia
                className={classes.mediaLogo}
                image={logoCC}
                title="Bienvenida"
              />
            </Card>
          </Grid>
        </Grid>
      </Hidden>
      <Container maxWidth='lg'>
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={imgPortada}
            title="Bienvenida"
          />
        </Card>
        <Typography variant='h4' align='center'>
          ¡¡ Bienvenido {user != null ? user.username : ''} a Coca-Cola Andina !!
        </Typography>

      </Container>
    </Fragment >
  )
}

export default Logged


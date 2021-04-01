import React from 'react'
import { Container, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import imagen from '../../Media/formularios/vaso_botella.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  text: {
    fontSize: 14
  }
}))

const FormularioOK = () => {
  const classes = useStyles();
  return (
    <Container maxWidth={'lg'}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        className={classes.root}
      >
        <Grid item xs={8}>
          <img alt="" src={imagen} style={{ width: '100%', paddingTop: 60 }} />
        </Grid>
        <Grid item xs={8}>
          <Typography variant='subtitle2' className={classes.text}>
            Muchas gracias por contactarse con nosotros.
          </Typography>
          <Typography variant='subtitle2'>
            Te invitamos a seguir disfrutando de nuestro mundo de sabores.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
}

export default FormularioOK

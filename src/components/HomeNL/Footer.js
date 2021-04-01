import React from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Box } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none'
  },
  Box: {
    paddingBottom: 20,
    textAlign: 'center',
  },
  text: {
    [theme.breakpoints.down('xs')]: {
      color: 'white'
    },
  },
  buttonText: {
    margin: 'auto',
    fontSize: '11px'
  },
  container: {
    alignContent: 'center',
    textAlign: 'center',
    paddingTop: 20
  }
}))

const Footer = () => {

  const classes = useStyles();

  return (
    <Box className={classes.Box}>
      <Typography variant="subtitle2" className={classes.text}>
        Embotelladora Andina S.A - Av. Miraflores 9153, Renca, Santiago-Chile
      </Typography>
      <Typography variant="subtitle2" className={classes.text}>
        Teléfono 600 360 3600
      </Typography>
      <Typography variant="caption" className={classes.text}>
        © Coca-Cola 2020. Todos los Derechos Reservados.
      </Typography>
      <br />
      <Link to='/terms' className={classes.link}>
        <Button variant='text' style={{ fontSize: '0.75rem' }} className={classes.text}>
          Términos y condiciones
              </Button>
      </Link>
    </Box>
  )
}

export default Footer

export const Links = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div style={{ display: 'block' }}>
        {props.signUp && <Link to='/accounts/signup' className={classes.link}>
          <Button className={classes.buttonText}>
            Cree su cuenta.
          </Button>
        </Link>}
      </div>
      <div style={{ display: 'block' }}>
        {props.signIn && <Link to='/accounts/login' className={classes.link}>
          <Button className={classes.buttonText}>
            Active su cuenta.
          </Button>
        </Link>}
      </div>
      <div style={{ display: 'block' }}>
        {props.recovery && <Link to='/accounts/recovery' className={classes.link}>
          <Button className={classes.buttonText}>
            Recupere su contraseña
          </Button>
        </Link>}
      </div>
    </div>
  )
}

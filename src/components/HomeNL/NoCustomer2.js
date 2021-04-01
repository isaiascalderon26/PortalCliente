import React from 'react'
import { Paper, Button, Typography, Box } from '@material-ui/core'
import logo from '../../Media/bgQuieroSerCliente.jpg'
import { motion } from 'framer-motion'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    height: '100%',
    padding: '10px 10px 10px 10px'
  },
  imagen: {
    width: 'calc(100% - 30px)',
    margin: 15
  },
  typContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  Box: {
    paddingBottom: 20,
    textAlign: 'center'
  },
  link: {
    textDecoration: 'none'
  },
}))

const NoCustomer2 = () => {

  const classes = useStyles()

  return (<motion.div
    initial={{ scale: 0.5 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <Paper elevation={3} variant='outlined' className={classes.paper}>
      <img src={logo} className={classes.imagen} alt="" />
      <Typography variant='h5' align='center' className={classes.typContainer}>
        ¿No es cliente? Únase de forma fácil y segura
              </Typography>
      <Box className={classes.Box}>
        <a href='https://embotelladoraandina.cl/form' className={classes.link}>
          <Button color='primary' variant="contained" >
            Quiero ser cliente
                </Button>
        </a>
      </Box>
    </Paper>
  </motion.div>
  )
}

export default NoCustomer2

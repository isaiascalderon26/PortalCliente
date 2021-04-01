import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { motion } from 'framer-motion'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: 'auto',
    padding: 15,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 20,
  },
  text: {
    color: 'white'
  },
  link: {
    textDecoration: 'none'
  },
}))

const NoCustomer = () => {

  const classes = useStyles()

  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Typography variant='h6' align='center' className={classes.text}>
        ¿No es cliente?
      </Typography>
      <Typography variant='h6' align='center' className={classes.text}>
        Únase de forma fácil y segura
      </Typography>
      <div className={classes.button}>
        <a href='https://embotelladoraandina.cl/form' className={classes.link}>
          <Button variant="contained" color="secondary" style={{ margin: 'auto' }}>
            Quiero ser cliente
                    </Button>
        </a>
      </div>
    </motion.div>
  )
}

export default NoCustomer

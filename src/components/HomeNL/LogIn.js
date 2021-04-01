import React, { useState, useContext } from 'react'
// import { Redirect } from "react-router"
import { motion } from 'framer-motion'
import { Formik } from 'formik';
import * as yup from 'yup'

import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Button,
  CircularProgress,
  Paper
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import { AccountContext } from '../accounts/Accounts'
import { Links } from './Footer'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: 'auto',
    padding: 15,
    marginBottom: 20,
    [theme.breakpoints.up('sm')]: {
      height: '100%'
    },
  },
  input: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 35,
    width: '100%'
  },
  title: {
    marginBottom: 25
  },
  error: {
    width: '90%',
    margin: 'auto',
    marginBottom: 15,
  },
  button: {
    width: '100%',
    textAlign: 'center',
    paddingBottom: 20
  },
  link: {
    textDecoration: 'none'
  },
  buttonText: {
    margin: 'auto',
    fontSize: '11px'
  }
}));

const LogIn = () => {

  const classes = useStyles();
  const { authenticate } = useContext(AccountContext)

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Favor ingresar Usuario'),
    password: yup
      .string()
      .required("Favor ingresar una contraseña"),
  })

  const onSubmit = async (values, { setSubmitting }) => {
    setError(null)
    const { username, password } = values

    await authenticate(username, password)
      .then((res) => {
        window.location.href = "/";
      })
      .catch((err) => {
        setSubmitting(false)
        setError(err)
      })
  }

  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Paper className={classes.root}>
        <Typography align='center' variant='h4' className={classes.title}>
          Ingresa
      </Typography>

        <Formik
          initialValues={{ username: '', password: '', }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
              <form onSubmit={handleSubmit}>
                <FormControl className={classes.input}>
                  <InputLabel htmlFor="username">Usuario</InputLabel>
                  <Input
                    id="username"
                    name='username'
                    startAdornment={
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    }
                    fullWidth={true}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                  />
                </FormControl>

                <FormControl className={classes.input}>
                  <InputLabel htmlFor="password">Contraseña</InputLabel>
                  <Input
                    id="password"
                    name="password"
                    startAdornment={
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="start" onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </InputAdornment>
                    }
                    fullWidth={true}
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl>


                {errors.username && touched.username ?
                  <Alert severity="warning" className={classes.error}>{errors.username}</Alert>
                  :
                  null
                }
                {errors.password && touched.password ?
                  <Alert severity="warning" className={classes.error}>{errors.password}</Alert>
                  :
                  null
                }
                <HandlerError error={error} />

                <div className={classes.button}>
                  <Button variant="contained" color="primary" type="submit" disabled={isSubmitting} style={{ margin: 'auto' }}>
                    Ingresar {isSubmitting ? <CircularProgress size={20} /> : null}
                  </Button>
                </div>
                <Divider />
                <Links signUp recovery />
              </form>
            )}
        </Formik>
      </Paper>
    </motion.div>
  )
}

export default LogIn


const HandlerError = ({ error }) => {
  const classes = useStyles();
  if (error === null) return (<></>)
  if (error.code === 'NotAuthorizedException') return (
    <Alert severity="error" className={classes.error}>
      Usuario o Contraseña Incorrectos
    </Alert>
  )
  return (
    <Alert severity="error" className={classes.error}>
      Error desconocido
    </Alert>
  )
}
import React, { Fragment, useState } from 'react'
import { CognitoUser } from 'amazon-cognito-identity-js'
import Pool from '../accounts/UserPool'

import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

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
  Container,
  Paper
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import MailIcon from '@material-ui/icons/Mail';
import { Links } from './Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: 'auto',
    padding: 15,
    marginBottom: 20,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 35,
      paddingRight: 35,
      paddingBottom: 50
    }
  },
  margin: {
    marginTop: 20,
    width: '100%'
  },
  title: {
    padding: '15px 0 20px 0'
  },
  button: {
    width: '100%',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  link: {
    textDecoration: 'none'
  }
}));

const Recovery = () => {


  const [stage, setStage] = useState(0)
  const [email, setEmail] = useState('')

  const onSubmit = () => {
    setStage(1)
  }
  const updateMail = (mail) => {
    setEmail(mail)
  }

  return (
    <Fragment>
      {stage === 0 && <RecoveryState0 onSubmit={onSubmit} setEmail={updateMail} />}
      {stage === 1 && <RecoveryState1 email={email} />}
    </Fragment>
  )
}
export default Recovery

const RecoveryState0 = (props) => {
  const classes = useStyles();

  const [error, setError] = useState(null)
  return (
    <Container maxWidth='sm'>
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Paper className={classes.root}>
          <Typography variant='h4' align='center' className={classes.title}>
            Restablecer Contraseña
      </Typography>
          <Divider variant='middle' />
          <Fragment>
            <Typography variant='body1' align='left' className={classes.title}>
              Favor ingresar tu Usuario o Correo electronico usado en la creacion de tu cuenta.
      </Typography>
            <Formik
              initialValues={{ email: '' }}
              validationSchema={
                yup.object().shape({
                  email: yup
                    .string()
                    .email('E-mail ingresado no es valido')
                    .required('Favor ingresar e-mail'),
                })}

              onSubmit={(values, { setSubmitting }) => {
                setError(null)
                const { email } = values
                props.setEmail(email)
                const getUser = () => {
                  return new CognitoUser({
                    Username: email.toLowerCase(),
                    Pool
                  });
                };

                getUser().forgotPassword({
                  onSuccess: data => {
                    console.log("onSuccess:", data);
                  },
                  onFailure: err => {
                    console.error("onFailure:", err);
                  },
                  inputVerificationCode: data => {
                    console.log("Input code:", data);
                    props.onSubmit()
                  }
                });
                setSubmitting(false)

              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                  <form onSubmit={handleSubmit}>
                    <FormControl className={classes.margin}>
                      <InputLabel htmlFor="email">Email</InputLabel>
                      <Input
                        id="email"
                        name='email'
                        startAdornment={
                          <InputAdornment position="start">
                            <MailIcon />
                          </InputAdornment>
                        }
                        fullWidth={true}
                        type='email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormControl>
                    {errors.email && touched.email ?
                      <Alert severity="warning" className={classes.margin}>{errors.email}</Alert>
                      :
                      null
                    }
                    {error !== null ?
                      error === 'undefined' ?
                        <Alert severity="error" className={classes.margin}>
                          Ha ocurrido un error no identificado. Favor intentelo mas tarde
                    </Alert>
                        :
                        error === 'userDoesntExist' ?
                          <Alert severity="error" className={classes.margin}>
                            <p>No se ha encontrado ningun usuario asociado al correo ingresado.</p>
                          </Alert>
                          :
                          null
                      : null
                    }

                    <div className={classes.button}>
                      <Button variant="contained" disabled={isSubmitting} color="primary" type="submit" style={{ margin: 'auto' }}>
                        Enviar Codigo {isSubmitting ? <CircularProgress size={20} /> : null}
                      </Button>
                    </div>
                    <Divider />
                    <Links signIn signUp />
                  </form>
                )}
            </Formik>
          </Fragment>
        </Paper >
      </motion.div>
    </Container>
  )
}

const RecoveryState1 = (props) => {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState(null)
  return (
    <Container maxWidth='sm'>
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Paper className={classes.root}>
          <Typography variant='h4' align='center' className={classes.title}>
            Restablecer Contraseña
      </Typography>
          <Divider variant='middle' />
          <Fragment>
            <Typography variant='body1' align='left' className={classes.title}>
              Favor ingresas el Codgio de veriicacion y su nueva contrase~na.
      </Typography>
            <Formik
              initialValues={{ code: '', password: '', password2: '' }}
              validationSchema={
                yup.object().shape({
                  password: yup
                    .string()
                    .required("Favor ingresar una contraseña")
                    .matches(
                      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                      "El password debe ser de almenos 8 caracteres, debe contener almenos: -Una Mayuscula, Una Minuscula, Un numero y un caracter especial"
                    ),
                  password2: yup
                    .string()
                    .when("password", {
                      is: val => (val && val.length > 0 ? true : false),
                      then: yup.string().oneOf(
                        [yup.ref("password")],
                        "Las contraseñas ingresadas no coinciden"
                      )
                    })
                })}

              onSubmit={(values, { setSubmitting }) => {
                setError(null)
                const { code, password } = values
                const { email } = props
                const getUser = () => {
                  return new CognitoUser({
                    Username: email.toLowerCase(),
                    Pool
                  });
                };
                getUser().confirmPassword(`${code}`, password, {
                  onSuccess: data => {
                    console.log("onSuccess:", data);
                    setSubmitting(false)
                    window.location.href = "/";
                  },
                  onFailure: err => {
                    setError(err)
                    setSubmitting(false)
                  }
                });
                // getUser().forgotPassword({
                //   onSuccess: data => {
                //     console.log("onSuccess:", data);
                //   },
                //   onFailure: err => {
                //     console.error("onFailure:", err);
                //   },
                //   inputVerificationCode: data => {
                //     console.log("Input code:", data);
                //     props.onSubmit()
                //   }
                // });
                // setSubmitting(false)

              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                  <form onSubmit={handleSubmit}>
                    <FormControl className={classes.margin}>
                      <InputLabel htmlFor="code">Codigo</InputLabel>
                      <Input
                        id="code"
                        name='code'
                        // startAdornment={
                        //   <InputAdornment position="start">
                        //     <MailIcon />
                        //   </InputAdornment>
                        // }
                        fullWidth={true}
                        type='number'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormControl>
                    {errors.email && touched.email ?
                      <Alert severity="warning" className={classes.margin}>{errors.email}</Alert>
                      :
                      null
                    }

                    <FormControl className={classes.margin}>
                      <InputLabel htmlFor="password">Nueva Contraseña</InputLabel>
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
                    {errors.password && touched.password ?
                      <Alert severity="warning" className={classes.margin}>{errors.password}</Alert>
                      :
                      null
                    }

                    <FormControl className={classes.margin}>
                      <InputLabel htmlFor="password">Repita su Contraseña</InputLabel>
                      <Input
                        id="password2"
                        name="password2"
                        startAdornment={
                          <InputAdornment position="start">
                            <LockIcon />
                          </InputAdornment>
                        }
                        fullWidth={true}
                        type={showPassword ? 'text' : 'password'}
                        value={values.password2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </FormControl>
                    {errors.password2 && touched.password2 ?
                      <Alert severity="warning" className={classes.margin}>{errors.password2}</Alert>
                      :
                      null
                    }
                    <HandledError error={error} />
                    {/* {error !== null ?
                    error === 'undefined' ?
                      <Alert severity="error" className={classes.margin}>
                        Ha ocurrido un error no identificado. Favor intentelo mas tarde
                    </Alert>
                      :
                      error === 'userDoesntExist' ?
                        <Alert severity="error" className={classes.margin}>
                          <p>No se ha encontrado ningun usuario asociado al correo ingresado.</p>
                        </Alert>
                        :
                        <Alert severity="error" className={classes.margin}>
                          <p>No se ha encontrado ningun usuario asociado al correo ingresado.</p>
                        </Alert>
                    : null
                  } */}

                    <div className={classes.button}>
                      <Button variant="contained" disabled={isSubmitting} color="primary" type="submit" style={{ margin: 'auto' }}>
                        Reiniciar Password {isSubmitting ? <CircularProgress size={20} /> : null}
                      </Button>
                    </div>
                    <Divider />
                    <div className={classes.button}>
                      <Link to='/accounts/signup' className={classes.link}>
                        <Button color="primary" disabled={isSubmitting} style={{ margin: 'auto', fontSize: '10px' }}>
                          Si aun no tienes una cuenta, haz click aqui para crear una.
                    </Button>
                      </Link>
                      <Link to='/accounts/login' className={classes.link}>
                        <Button color="primary" disabled={isSubmitting} style={{ margin: 'auto', fontSize: '10px' }}>
                          Si tienes una cuenta, haz click aqui para ingresar.
                    </Button>
                      </Link>
                    </div>
                  </form>
                )}
            </Formik>
          </Fragment>
        </Paper >
      </motion.div>
    </Container>
  )
}

const HandledError = ({ error }) => {

  const classes = useStyles();
  if (error === null) return (<></>)
  if (error.code === 'CodeMismatchException') {
    return (
      <Alert severity="error" className={classes.margin}>
        <p>El codigo Ingresado se encuentra erroneo o ha expidao, Favor intentarlo nuevamente.</p>
      </Alert>
    )
  }
  if (error.code === 'LimitExceededException') {
    return (
      <Alert severity="error" className={classes.margin}>
        <p>Se ha alcanzado el limite de intentos, favor probar nuevamente mas tarde</p>
      </Alert>
    )
  }

  return (
    <Alert severity="error" className={classes.margin}>
      <p>Ha ocurrido un error no identificado. Favor intentelo mas tarde.</p>
    </Alert>
  )
}
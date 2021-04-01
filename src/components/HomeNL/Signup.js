import React, { useState, useEffect, Fragment } from 'react'
import { CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { Formik, Field } from 'formik';

import { motion } from "framer-motion";
import axios from 'axios'
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
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Paper,
  FormHelperText,
  TextField,
  Container
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import UserPool from '../accounts/UserPool'
import { Links } from './Footer';

const useStyles = makeStyles((theme) => ({
  realRoot: {
    [theme.breakpoints.down('xs')]: {
      maxHeight: '85vh',
      overflowY: 'scroll'
    }
  },
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
  text: {
    padding: '20px 0 0px 0'
  },
  button: {
    width: '100%',
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  link: {
    textDecoration: 'none'
  }
}));

const Signup = () => {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false)
  const [submit, setSubmit] = useState(false)
  const [error, setError] = useState(null)
  const [response, setResponse] = useState(null)

  const [rutLoading, setRutLoading] = useState(false)
  const [rutValidado, setRutValidado] = useState(false)
  const [rs, setRs] = useState('')
  const [changeRUT, setChangeRUT] = useState(false)

  const dv = (T) => {
    console.log('T', T)
    var M = 0, S = 1;
    for (; T; T = Math.floor(T / 10))
      S = (S + T % 10 * (9 - M++ % 6)) % 11;
    return S ? S - 1 : 'k';
  }

  const validateRut = (e) => {
    if (changeRUT === true) {
      setRutValidado(false)
      setChangeRUT(false)
      setRutLoading(true)
      var rut = e.replace(/\./g, '')
      if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rut)) {
        setRutValidado(false)
        setRutLoading(false)
        return 'Formato Incorrecto';
      }
      var tmp = rut.split('-');
      var digv = tmp[1];
      rut = tmp[0];
      if (digv === 'K') digv = 'k';
      console.log('asdfg', dv(rut))
      if (dv(rut) === digv) {
        console.log('asdfg')
        console.log('RS')
        return axios
          .get(`https://mimx1e8tqi.execute-api.us-east-1.amazonaws.com/dev/sii/consulta/${rut}-${digv}`)
          .then((res) => {
            setRutLoading(false)
            setRs(res.data.razon_social)
            setRutValidado(true)
            return ''
            // return axios
            //   .get(`/api/isCustomer/?rut=${rut}-${digv}`)
            //   .then(res2 => {
            //     setToken(res2.data)
            //     setRutLoading(false)
            //     setRutValidado(true)
            //     setChangeRUT(false)
            //     setRs(res.data.razon_social)
            //     console.log(res.data.razon_social)
            //     return ''
            //   })
            //   .catch(err2 => {
            //     setRutLoading(false)
            //     setRutValidado(false)
            //     return 'No se ha encontrado cliente asociado a este RUT'
            //   })
          })
          .catch((err) => {
            setRutLoading(false)
            setRutValidado(false)
            return 'Error al obtener RS'
          })
      }
      setRutLoading(false)
      setRutValidado(false)
      return 'RUT Invalido'
    }
    else {
      return ''
    }
  }

  useEffect(() => {
  }, [error])

  if (submit === false) {
    return (
      <Container maxWidth='sm'>
        <Formik
          initialValues={{ rut: '', nombre: '', apellido: '', username: '', email: '', telefono: '', password: '', password2: '', termCond: false }}
          validationSchema={
            yup.object().shape({
              rut: yup
                .string()
                .required('Favor ingresar RUT'),
              telefono: yup
                .string()
                .required('Favor ingresar Nro Telefono'),
              username: yup
                .string()
                .required('Favor ingresar Usuario'),
              termCond: yup
                .bool()
                .oneOf([true], 'Favor Aceptar terminos y condiciones'),
              email: yup
                .string()
                .email('E-mail ingresado no es valido')
                .required('Favor ingresar e-mail'),
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
            const { username, password, email, nombre, apellido, rut, telefono } = values
            UserPool.signUp(username, password, [
              new CognitoUserAttribute({ Name: 'email', Value: email }),
              new CognitoUserAttribute({ Name: 'custom:nombre', Value: `${nombre}` }),
              new CognitoUserAttribute({ Name: 'custom:apellidos', Value: `${apellido}` }),
              new CognitoUserAttribute({ Name: 'custom:telefono', Value: `${telefono}` }),
              new CognitoUserAttribute({ Name: 'custom:rut', Value: `${rut}` })
            ], null, (err, data) => {
              if (err) {
                console.log(err)
                setError(err.code)
                setSubmitting(false)
              }
              else {
                console.log(data)
                setResponse(data)
                setSubmit(true)
              }
            })
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
              <Fragment>
                <div className={classes.realRoot}>
                  <form onSubmit={handleSubmit}>
                    <motion.div
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Paper className={classes.root}>
                        <Typography variant='h4' align='center' className={classes.title}>
                          Active su cuenta
                        </Typography>
                        <Divider variant='middle' />
                        <Field
                          name='rut'
                          id='rut'
                          validate={(e) => validateRut(e)}
                        >{({ field, form }) => {
                          return (
                            <FormControl className={classes.margin}>
                              <InputLabel htmlFor="rut">Rut</InputLabel>
                              <Input
                                name='rut'
                                id='rut'
                                startAdornment={
                                  <InputAdornment position="start">
                                    <FingerprintIcon />
                                  </InputAdornment>
                                }
                                fullWidth={true}
                                onChange={(e) => {
                                  setChangeRUT(true)
                                  handleChange(e)
                                }
                                }
                                onBlur={handleBlur}
                                value={values.rut}
                                aria-describedby="helperRUT"
                                onInput={(e) => {
                                  e.target.value = (e.target.value).toString().slice(0, 12)
                                }}
                              />
                              <FormHelperText id="helperRUT-weight-helper-text">Favor ingrese su RUT Comercial,incluir puntos y guion</FormHelperText>
                            </FormControl>
                          )
                        }}
                        </Field>
                        {errors.rut && touched.rut ?
                          <Alert severity="warning" className={classes.margin}>{errors.rut}</Alert>
                          :
                          null
                        }
                        {rutLoading ?
                          null
                          :
                          null
                        }
                      </Paper >
                    </motion.div>
                    {rutLoading && <div style={{ textAlign: 'center', alignContent: 'center' }}>
                      <motion.div>
                        <h1><CircularProgress /></h1>
                      </motion.div>
                    </div>}

                    {rutValidado ?
                      <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Paper className={classes.root}>
                          <Typography align='center' className={classes.text}>
                            Favor completar los siguientes datos:
                   </Typography>
                          <TextField disabled id="rs" label="Razon Social" value={rs} className={classes.margin} />

                          <FormControl className={classes.margin}>
                            <InputLabel htmlFor="username">Nombre</InputLabel>
                            <Input
                              id="nombre"
                              name='nombre'
                              startAdornment={
                                <InputAdornment position="start">
                                  <AccountBoxIcon />
                                </InputAdornment>
                              }
                              fullWidth={true}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.nombre}
                            />
                          </FormControl>

                          <FormControl className={classes.margin}>
                            <InputLabel htmlFor="username">Apellidos</InputLabel>
                            <Input
                              id="apellido"
                              name='apellido'
                              startAdornment={
                                <InputAdornment position="start">
                                  <AccountBoxIcon />
                                </InputAdornment>
                              }
                              fullWidth={true}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.apellido}
                            />
                          </FormControl>
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
                          <FormControl className={classes.margin}>
                            <InputLabel htmlFor="email">Telefono</InputLabel>
                            <Input
                              id="telefono"
                              name='telefono'
                              startAdornment={
                                <InputAdornment position="start">
                                  <MailIcon />
                                </InputAdornment>
                              }
                              fullWidth={true}
                              type='number'
                              value={values.telefono}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </FormControl>

                          <FormControl className={classes.margin}>
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
                          {errors.username && touched.username ?
                            <Alert severity="warning" className={classes.margin}>{errors.username}</Alert>
                            :
                            null
                          }
                          <FormControl className={classes.margin}>
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
                          {errors.password && touched.password ?
                            <Alert severity="warning" className={classes.margin}>
                              La contrase~na debe cumplir con los siguientes requisitos:
                              <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
                                <ListItemIcon style={{ minWidth: 15 }}>{(values.password).length > 7 ?
                                  <CheckCircleIcon style={{ color: 'green' }} fontSize='small' />
                                  :
                                  <CancelIcon style={{ color: 'red' }} fontSize='small' />
                                }</ListItemIcon>
                                <ListItemText>Almenos 8 caracteres.</ListItemText>
                              </ListItem>
                              <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
                                <ListItemIcon style={{ minWidth: 15 }}>{
                                  //eval("/[A-Z]/").test(values.password) ?
                                  "/[A-Z]/".match(values.password) ?
                                  <CheckCircleIcon style={{ color: 'green' }} fontSize='small' />
                                  :
                                  <CancelIcon style={{ color: 'red' }} fontSize='small' />
                                }</ListItemIcon>
                                <ListItemText>Almenos una letra Mayuscula.</ListItemText>
                              </ListItem>
                              <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
                                <ListItemIcon style={{ minWidth: 15 }}>{
                                  // eval("/[a-z]/").test(values.password) ?
                                  "/[a-z]/".match(values.password) ?
                                  <CheckCircleIcon style={{ color: 'green' }} fontSize='small' />
                                  :
                                  <CancelIcon style={{ color: 'red' }} fontSize='small' />
                                }</ListItemIcon>
                                <ListItemText>Almenos una letra Minuscula.</ListItemText>
                              </ListItem>
                              <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
                                <ListItemIcon style={{ minWidth: 15 }}>{
                                  //eval("/[0-9]/").test(values.password) ?
                                  "/[0-9]/".match(values.password) ?
                                  <CheckCircleIcon style={{ color: 'green' }} fontSize='small' />
                                  :
                                  <CancelIcon style={{ color: 'red' }} fontSize='small' />
                                }</ListItemIcon>
                                <ListItemText>Almenos una letra numero.</ListItemText>
                              </ListItem>
                              <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
                                <ListItemIcon style={{ minWidth: 15 }}>{
                                  "/[!@#$%^&*(),.?\"\\:{}[]|;<>]/".match(values.password) ?
                                  <CheckCircleIcon style={{ color: 'green' }} fontSize='small' />
                                  :
                                  <CancelIcon style={{ color: 'red' }} fontSize='small' />
                                }</ListItemIcon>
                                <ListItemText>Almenos un caracter especial.</ListItemText>
                              </ListItem>
                            </Alert>
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
                          <FormControlLabel
                            control={<Checkbox name="termCond" onChange={handleChange} />}
                            label={<span style={{ fontSize: '12px' }} >Acepto terminos y condiciones de privacidad</span>}

                          />
                          <ErrorHandler error={error} />

                          <div className={classes.button}>
                            <Button variant="contained" color="primary" type="submit" disabled={isSubmitting} style={{ margin: 'auto' }}>
                              Crear Cuenta {isSubmitting ? <CircularProgress size={20} /> : null}
                            </Button>
                          </div>

                        </Paper>
                      </motion.div>

                      :
                      null
                    }
                  </form>
                </div>
              </Fragment>
            )}
        </Formik>
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Paper className={classes.root}>
            <Links signIn recovery />
          </Paper>
        </motion.div>
      </Container >
    )
  }
  else {
    if (error == null) {
      return (
        <Container maxWidth='sm'>
          <Alert severity='success' className={classes.margin}>
            <strong>{response.user.username}</strong>! Tu cuenta ha sido creada con exito, en breve reciviras un mail de activacion a tu correo electronico [<strong>{response.codeDeliveryDetails.Destination}</strong>]
          </Alert>
        </Container>


      )
    }
    else {
      return (
        <Container maxWidth='sm'>
          <Alert severity='warning' className={classes.margin}>
            Ha habido un error con la creaicon de su cuenta, favor intentarlo nuevamente. Si el error persiste favor comunicarse al siguiente mail nvaras@koandina.com.
            {error.message}
          </Alert>
        </Container>

      )
    }
  }
  // }
}

export default Signup


const ErrorHandler = ({ error }) => {
  const classes = useStyles();
  if (error === null || error === {}) return (<></>)
  if (error === "UsernameExistsException") {
    return (
      <Alert severity="error" className={classes.margin}>
        El nombre de usuario ya se encuentra utilizado, favor modificar
      </Alert>
    )
  }
  return (
    <Alert severity="error" className={classes.margin}>
      Ha ocurrido un error no identificado. Favor intentelo mas tarde
    </Alert>
  )
}
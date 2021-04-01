import React, { useState, useEffect, Fragment, useContext } from 'react'
import { AccountContext } from '../accounts/Accounts'
import { motion, useAnimation, transform } from "framer-motion";
import { Formik, Field } from 'formik';
import * as yup from 'yup'
import axios from 'axios'

import {
  Container,
  Paper,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  CircularProgress,
  Hidden,
  InputAdornment
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import FormularioOK from './FormularioOK';

import { formOpt, userInfo } from '../aws_urls'
// import { getCookie } from '../Varios/csrftoken'
// import { loadUserData } from '../../actions/auth'

import imagen from '../../Media/formularios/vaso_botella.jpg'
// import { motion } from 'framer-motion';

const useStyles = makeStyles((theme) => ({
  paperHeader: {
    marginTop: 30,
    padding: 10,
    marginBottom: 20
  },
  titleHeader: {
    marginBottom: 20
  },
  paperBody: {
    padding: 10,
  },
  textField: {
    // paddingTop: 20,
    paddingBottom: 0
  },
  select: {
    paddingBottom: 15
  }
}))



const Formulario = (props) => {
  // title
  // opt
  const maxLength = 240
  const lengthWarning = 40
  const [value, setValue] = useState("");
  const classes = useStyles();
  const { getSession } = useContext(AccountContext)

  const [opciones, setOpciones] = useState(null)
  const [locales, setLocales] = useState(null)
  const [submited, setSubmited] = useState(false)

  const controls = useAnimation();
  const mapRemainingToColor = transform([2, lengthWarning], ["#ff0000", "#ccc"]);
  const mapRemainingToSpringVelocity = transform([0, lengthWarning], [2, 0]);

  const reqNroSerie = (value) => {

    if (opciones === null) {
      return false
    }
    for (var i = 0; i < opciones.length; i++) {
      if (opciones[i].id === value) {
        return opciones[i].options.reqNroSerie
      }
    }
    return false
  }

  const reqMarca = (value) => {
    if (opciones === null) {
      return false
    }
    for (var i = 0; i < opciones.length; i++) {
      if (opciones[i].id === value) {
        return opciones[i].options.reqEquipo
      }
    }
    return false
  }

  const reqModelo = (value) => {
    if (opciones === null) {
      return false
    }
    for (var i = 0; i < opciones.length; i++) {
      if (opciones[i].id === value) {
        return opciones[i].options.reqModelo
      }
    }
    return false
  }

  useEffect(() => {
    console.log('OPT:', opciones)
    if (opciones === null) {
      getSession()
        .then(async (user) => {
          axios
            .get(`${formOpt}?opt=${props.opt}`, { headers: user.headers })
            .then(res => {
              setOpciones(res.data.payload.Items)
            })
            .catch(err => console.log(err))
          var rut = user['custom:rut'].replace('.', '').replace('.', '')
          rut = ('0000000000' + rut).slice(-10)
          const url = `${userInfo}?rut=81201000-K`

          axios
            .get(url, { headers: user.headers })
            .then(data => {
              if (data.data.status === 200) {
                setLocales(data.data.payload)
              }
            })
          // dispatch(loadUserData())
        })
    }

  }, [opciones, getSession, props])

  useEffect(() => {

    const charactersRemaining = maxLength - value.length;
    if (charactersRemaining > lengthWarning) return;
    controls.start({
      scale: 1,
      transition: {
        type: "spring",
        velocity: mapRemainingToSpringVelocity(charactersRemaining),
        stiffness: 700,
        damping: 80
      }
    });
  }, [value.length, controls, mapRemainingToSpringVelocity]);

  if (!submited) {
    return (
      <Container maxWidth='md'>
        <Grid container>
          <Grid item xs={12} sm={10} md={8}>
            <motion.div
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Formik
                initialValues={{ requerimiento: '', numEquipo: '', celContacto: '', comentario: '', marca: '', modelo: '', nombre: '', kunnr: '', horario: '', direccion: '', refCalles: '' }}
                validationSchema={
                  yup.object().shape({
                    requerimiento: yup
                      .string()
                      .required('Favor completar Requerimiento'),
                    numEquipo: yup
                      .string()
                      .when('requerimiento', {
                        is: val => (!reqNroSerie(val)),
                        then: yup.string(),
                        otherwise: yup.string().required('Favor Ingresar Nro de Serie del Equipo'),
                      }),
                    marca: yup
                      .string()
                      .when('requerimiento', {
                        is: val => (!reqMarca(val)),
                        then: yup.string(),
                        otherwise: yup.string().required('Favor Ingresar Marca'),
                      }),
                    modelo: yup
                      .string()
                      .when('requerimiento', {
                        is: val => (!reqModelo(val)),
                        then: yup.string(),
                        otherwise: yup.string().required('Favor Ingresar Modelo'),
                      }),
                    celContacto: yup
                      .string()
                      .required('Favor completar Nro de Teléfono'),
                  })
                }
                onSubmit={(values, { setSubmitting }) => {
                  // setError(null)
                  const { numEquipo, celContacto, comentario, marca, modelo, nombre, kunnr, horario, direccion, refCalles } = values
                  const servicio = opciones[0].service
                  const idRquest = values.requerimiento
                  let { requerimiento } = values
                  for (const option in opciones) {
                    if (opciones[option].id === requerimiento) {
                      requerimiento = opciones[option].subService
                    }
                  }


                  getSession()
                    .then(async (user) => {
                      const username = user.user.username
                      const body = JSON.stringify({ idRquest, username, servicio, requerimiento, numEquipo, celContacto, comentario, marca, modelo, nombre, kunnr, horario, direccion, refCalles })
                      const url = `${formOpt}`
                      await axios
                        .post(url, body, { headers: { ...user.headers, 'Content-Type': 'application/json' } })
                        .then(res => {
                          setSubmited(true)
                        })
                        .catch(err => {
                          console.log("ERROR:", err)
                        })
                    })
                  // const username = auth.user.username
                  // const config = {
                  //   headers: {
                  //     'Content-Type': 'application/json',
                  //     'X-CSRFToken': getCookie('csrftoken')
                  //   }
                  // }
                  // const body = JSON.stringify({ username, servicio, requerimiento, numEquipo, celContacto, comentario, marca, modelo, nombre, kunnr, horario, direccion })
                  // axios
                  //   .post(`/api/servClient/${props.opt}/`, body, config)
                  //   .then(res => {
                  //     setSubmited(true)
                  //     // setSubmit(true)
                  //   })
                  //   .catch(err => {
                  //     let errorAux = 'undefined'
                  //     try {
                  //       errorAux = JSON.parse(err.response.request.response)
                  //       errorAux = errorAux['non_field_errors'][0]
                  //     }
                  //     catch{ }
                  //     // setError(errorAux)
                  //     // console.log(err.response.request.response)
                  //     // setSubmitting(false)
                  //   })
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
                      <form onSubmit={handleSubmit}>
                        <Paper className={classes.paperHeader}>
                          <Typography variant='h4' align='center' className={classes.titleHeader}>
                            {props.title}
                          </Typography>


                          {opciones != null ?
                            <FormControl className={classes.select} fullWidth>
                              <InputLabel id="requerimiento">Requerimiento</InputLabel>
                              <Select
                                label="requerimiento"
                                id="requerimiento"
                                name="requerimiento"
                                value={values.requerimiento}
                                onChange={handleChange}
                              >
                                {opciones.map(item =>
                                  <MenuItem
                                    key={item.id}
                                    value={item.id}>
                                    {item.subService}
                                  </MenuItem>
                                )}

                              </Select>
                            </FormControl>
                            : null
                          }

                          {reqMarca(values.requerimiento) && values.requerimiento !== '' ?
                            <motion.div
                              initial={{ scale: 0.5 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <TextField
                                id="marca"
                                name="marca"
                                label="Marca"
                                value={values.marca}
                                onChange={handleChange}
                                className={classes.textField}
                                fullWidth
                              // disabled={values.requerimiento == '' || reqNroSerie(values.requerimiento)}
                              />
                            </motion.div>
                            : null}
                          {reqModelo(values.requerimiento) && values.requerimiento !== '' ?
                            <motion.div
                              initial={{ scale: 0.5 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <TextField
                                id="modelo"
                                name="modelo"
                                label="Modelo"
                                value={values.modelo}
                                onChange={handleChange}
                                className={classes.textField}
                                fullWidth
                              // disabled={values.requerimiento == '' || reqNroSerie(values.requerimiento)}
                              />
                            </motion.div>
                            : null}
                          {reqNroSerie(values.requerimiento) && values.requerimiento !== '' ?
                            <motion.div
                              initial={{ scale: 0.5 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <TextField
                                id="numEquipo"
                                name="numEquipo"
                                label="Nro de Serie"
                                value={values.numEquipo}
                                onChange={handleChange}
                                className={classes.textField}
                                fullWidth
                              // disabled={values.requerimiento == '' || reqNroSerie(values.requerimiento)}
                              />
                            </motion.div>
                            : null}
                        </Paper>

                        <motion.div
                          initial={{ scale: 0.5 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.3 }}
                        >

                          {values.requerimiento !== '' ?
                            <Paper className={classes.paperBody}>

                              <Fragment>
                                {locales !== null && locales.puntos ?
                                  locales.puntos.length > 1 ?
                                    <Fragment>
                                      <Field
                                        name="kunnr"
                                      >{({ field, form }) => {
                                        return (
                                          // <TextField
                                          //   {...field}
                                          //   className={classes.textField}
                                          //   label="ID Cliente"
                                          //   value={values.kunnr}
                                          //   onChange={e => {
                                          //     handleChange(e)
                                          //     form.setFieldValue('direccion', 'asd')
                                          //   }}
                                          // />

                                          <FormControl className={classes.select} fullWidth>
                                            <InputLabel id="kunnr">ID Cliente</InputLabel>
                                            <Select
                                              {...field}
                                              label="ID Cliente"
                                              id="kunnr"
                                              name="kunnr"
                                              value={values.kunnr}
                                              renderValue={(selected) => {
                                                return (
                                                  <span>{selected}</span>
                                                )
                                              }}
                                              onChange={e => {
                                                handleChange(e)
                                                const customer = e.target.value
                                                var dir = ''
                                                for (var i = 0; i < locales.puntos.length; i++) {
                                                  if (locales.puntos[i].kunnr === customer) {
                                                    dir = locales.puntos[i].direccion
                                                  }
                                                }
                                                form.setFieldValue('direccion', dir)
                                              }}
                                            >
                                              {locales.puntos.map(item =>
                                                <MenuItem
                                                  key={item.kunnr}
                                                  value={item.kunnr}>
                                                  {item.kunnr} - {item.direccion}
                                                </MenuItem>
                                              )}

                                            </Select>
                                          </FormControl>

                                        )
                                      }}
                                      </Field >
                                      <TextField
                                        fullWidth
                                        id="direccion"
                                        value={values.direccion}
                                        onChange={handleChange}
                                        label="Direccion"
                                        className={classes.textField}
                                        disabled={true}

                                      />
                                    </Fragment>
                                    :
                                    <Fragment>
                                      <TextField
                                        fullWidth
                                        id="kunnr"
                                        value={locales.puntos[0].kunnr}
                                        onChange={handleChange}
                                        label="ID Cliente"
                                        className={classes.textField}
                                        disabled={true}

                                      />
                                      <TextField
                                        fullWidth
                                        id="direccion"
                                        value={locales.puntos[0].direccion}
                                        onChange={handleChange}
                                        label="Direccion"
                                        className={classes.textField}
                                        disabled={true}

                                      />
                                    </Fragment>
                                  :
                                  <h1>
                                    Cargando...
                        </h1>
                                }
                                <TextField
                                  id="refCalles"
                                  fullWidth
                                  value={values.refCalles}
                                  onChange={handleChange}
                                  label="Referencia de calles"
                                  className={classes.textField}
                                />
                                <TextField
                                  id="nombre"
                                  fullWidth
                                  value={values.nombre}
                                  onChange={handleChange}
                                  label="Nombre"
                                  className={classes.textField}
                                />

                                <TextField
                                  fullWidth
                                  id="celContacto"
                                  value={values.celContacto}
                                  onChange={handleChange}
                                  label="Teléfono"
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start">+56 9 </InputAdornment>,
                                  }}
                                  onInput={(e) => {
                                    e.target.value = (e.target.value).toString().slice(0, 8)
                                  }}
                                />

                                <FormControl className={classes.select} fullWidth>
                                  <InputLabel id="horario">Horario de Visita</InputLabel>
                                  <Select
                                    label="horario"
                                    id="horario"
                                    name="horario"
                                    value={values.horario}
                                    onChange={handleChange}
                                  >
                                    <MenuItem value={'AM'}>AM</MenuItem>
                                    <MenuItem value={'PM'}>PM</MenuItem>
                                  </Select>
                                </FormControl>

                                <TextField
                                  fullWidth
                                  className={classes.textField}
                                  id="comentario"
                                  name="comentario"
                                  value={values.comentario}
                                  onChange={(e) => {
                                    setValue(e.target.value)
                                    handleChange(e)
                                  }}
                                  label="Comentarios"
                                  multiline
                                  rows={4}
                                  variant="outlined"
                                  onInput={(e) => {
                                    e.target.value = (e.target.value).toString().slice(0, maxLength)
                                  }}
                                />
                                <div style={{ paddinBottom: 15 }}>
                                  <div style={{
                                    // position: 'absolute',
                                    textAlign: 'right'
                                  }}>
                                    <motion.span
                                      animate={controls}
                                      style={{
                                        display: 'block',
                                        color: mapRemainingToColor(maxLength - value.length),
                                        fontSize: 20,
                                        fontWeight: 700
                                      }}
                                    >
                                      {maxLength - value.length}
                                    </motion.span>
                                  </div>
                                </div>
                                <Button
                                  color="primary"
                                  variant='contained'
                                  type='submit'
                                  disabled={isSubmitting}
                                >
                                  {isSubmitting ?
                                    <CircularProgress size={30} style={{ paddingRight: 10 }} />
                                    : null} Enviar

                        </Button>
                              </Fragment>
                            </Paper>
                            :
                            null
                          }
                          {errors.requerimiento && touched.requerimiento ?
                            <Alert severity="warning" className={classes.margin}>{errors.requerimiento}</Alert>
                            :
                            null
                          }
                          {errors.numEquipo && touched.numEquipo ?
                            <Alert severity="warning" className={classes.margin}>{errors.numEquipo}</Alert>
                            :
                            null
                          }
                          {errors.numEquipo && touched.numEquipo ?
                            <Alert severity="warning" className={classes.margin}>{errors.marca}</Alert>
                            :
                            null
                          }
                          {errors.numEquipo && touched.numEquipo ?
                            <Alert severity="warning" className={classes.margin}>{errors.modelo}</Alert>
                            :
                            null
                          }
                          {errors.celContacto && touched.celContacto ?
                            <Alert severity="warning" className={classes.margin}>{errors.celContacto}</Alert>
                            :
                            null
                          }

                        </motion.div>
                      </form>

                    </Fragment>
                  )}
              </Formik>
            </motion.div>
          </Grid>
          <Hidden smDown>
            <Grid item md={4}>
              <img src={imagen} style={{ width: '100%', padding: 10 }} alt='' />
            </Grid>
          </Hidden>
        </Grid>
      </Container >
    )
  }
  else {
    return (
      <FormularioOK />
    )
  }

}

export default Formulario

import React, { Fragment, useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AccountContext } from '../accounts/Accounts'
import { userInfo } from '../aws_urls'
import { motion } from 'framer-motion'
import Loading from '../Varios/Loading';
import {
  Grid,
  Typography,
  Container,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
  Checkbox,
  ListItemText,
  Modal,
  Fade,
  Backdrop
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';
// import Home from '../Home/Home';

// import { loadUserData, setLocation } from '../../actions/auth'

import bebidas from '../../Media/accounts/bebidas.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: 20,
    // padding: 10
  },
  paper: {
    height: '100%'
  },
  // imagen: {
  //   width: 'calc(100% - 30px)',
  //   margin: 15
  // },
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
  title: {
    // paddingBottom: ,

  },
  Grid: {
    paddingTop: 10,
    paddingBottom: 10
  },
  tittle: {
    paddingTop: '40px',
    paddingBottom: '40px',
    [theme.breakpoints.down('xs')]: {
      paddingTop: 0
    }
    // color: '#666'
  },
  icone: {
    color: '#666',
    fill: '#666'
  },
  subtitle: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  detalle: {
    paddingTop: 30
  },
  card: {
    width: '100%',
    // minWidth: 320,
    marginTop: 10,
    marginBottom: 20
  },
  cardMedia: {
    minHeight: 200,
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 250,
    // maxWidth: 250,
  },
  imagen: {
    paddingTop: 180,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 2, 2),
    outline: 'none'
  },
}))


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


// import Loading from '../elemComunes/Loading';

const UserInfo = () => {
  // const dispatch = useDispatch()
  // const auth = {isAutho}
  const classes = useStyles()

  const { getSession } = useContext(AccountContext)

  const [userData, setUserData] = useState(null)
  const [optComunas, setOpTComunas] = useState([])
  const [selComunas, setSelComunas] = useState([])
  const [optRegion, setOpTRegion] = useState([])
  const [selRegion, setSelRegion] = useState([])

  useEffect(() => {
    if (userData === null) {
      getSession()
        .then(async (user) => {
          // var rut = user['custom:rut'].replace('.', '').replace('.', '')
          // rut = ('0000000000' + rut).slice(-10)
          const url = `${userInfo}?rut=81201000-K`
          console.log("user session", user);
          await axios
            .get(url, { headers: user.headers })
            .then(data => {
              //console.log("user data", data);
              if (data.data.status === 200) {
                setUserData(data.data.payload)
              }
            })
            .catch(err => console.error(err))
        })
    }
  }, [userData, getSession])

  useEffect(() => {
    if (userData != null) {
      const i = userData.puntos ? userData.puntos.length : 0
      var optAux = []
      var optAux2 = []
      for (var j = 0; j < i; j++) {
        if (optAux.indexOf(userData.puntos[j].comuna) === -1) {
          optAux.push(userData.puntos[j].comuna)
        }
        if (optAux2.indexOf(userData.puntos[j].region) === -1) {
          optAux2.push(userData.puntos[j].region)
        }
      }
      optAux.sort()
      optAux2.sort()
      setOpTComunas(optAux)
      setOpTRegion(optAux2)
    }
  }, [userData])

  const handleChange = (event) => {
    setSelComunas(event.target.value);
  }

  const handleChange2 = (event) => {
    setSelRegion(event.target.value);
  }


  // if (auth.userData == null && auth.userDataError == null) {
  //   return (
  //     <div>
  //       Loading
  //     </div>
  //   )
  // }
  // else {
  if (userData != null) {
    return (
      <Fragment>
        <Container maxWidth='lg' className={classes.root}>
          <Grid container justify='center'>
            <Grid item xs={12} md={8}>
              <Typography variant='h4' className={classes.tittle} align='center'>
                Datos Comerciales
                  </Typography>

              <Typography className={classes.subtitle}>
                <strong>Rut : {userData.rut}</strong>
              </Typography>
              <Typography>
                <strong>Razon Social : {userData.razonSocial}</strong>
              </Typography>
              <Divider />
              {userData.puntos ? userData.puntos.length > 1 ?
                <Grid
                  container
                  spacing={2}
                  justify='center'
                >
                  <Grid item xs={12} sm={5}>
                    <FormControl className={classes.formControl} fullWidth={true}>
                      <InputLabel id="comunaLabel">Comuna</InputLabel>
                      <Select
                        labelId="comuna"
                        id="comuna"
                        multiple
                        value={selComunas}
                        onChange={handleChange}
                        input={<Input />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                      >
                        {optComunas.map((comuna) => (
                          <MenuItem key={comuna} value={comuna}>
                            <Checkbox checked={selComunas.indexOf(comuna) > -1} />
                            <ListItemText primary={comuna} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <FormControl className={classes.formControl} fullWidth={true}>
                      <InputLabel id="regionLabel">Region</InputLabel>
                      <Select
                        labelId="region"
                        id="region"
                        multiple
                        value={selRegion}
                        onChange={handleChange2}
                        input={<Input />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                      >
                        {optRegion.map((comuna) => (
                          <MenuItem key={comuna} value={comuna}>
                            <Checkbox
                              checked={selRegion.indexOf(comuna) > -1}
                            />
                            <ListItemText primary={comuna} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                : null
              : null}


              <Grid container>
                {userData.puntos ?
                  userData.puntos.filter(item => {
                    if (selComunas.length === 0) {
                      return true
                    }
                    else {
                      return selComunas.indexOf(item.comuna) !== -1
                    }
                  })
                  .filter(item => {
                    if (selRegion.length === 0) {
                      return true
                    }
                    else {
                      return selRegion.indexOf(item.region) !== -1
                    }
                  })
                  .map(item =>

                    <LocalCard
                      info={item}
                      key={item.kunnr}
                      cust={item.kunnr}
                    />


                  ): null}
              </Grid>
            </Grid>

            <Grid item md={4} className={classes.imagen}>
              <img src={bebidas} style={{ width: '100%' }} alt='' />
            </Grid>
          </Grid>

        </Container>
      </Fragment >
    )
  }
  else {
    return (
      <Loading />
    )
  }
}


export default UserInfo


const LocalCard = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [listPhone] = React.useState(props.info.telefono);
  const [listEmail] = useState(props.info.email)

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid item xs={12} sm={6} md={6} style={{ padding: 10 }} name={props.cust}>
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
        exit={{ scale: 0.5 }}
      >
        <Card elevation={3} style={{ width: '100%' }}>
          <CardContent>
            <Typography gutterBottom variant="h6" >
              ID : {props.info.kunnr}
            </Typography>
            <Typography variant="body2" component="p">
              Direccion: {props.info.direccion}
            </Typography>
            <Typography variant="body2" component="p">
              Comuna: {props.info.comuna}
            </Typography>
            <Typography variant="body2" component="p">
              Region: {props.info.region}
            </Typography>
            {props.info.telefono.length > 0 ?
              <Grid container alignItems="stretch">
                <Grid item>
                  <Typography variant="body2" component="p">
                    Telefono:
              </Typography>
                </Grid>
                <Grid item>
                  {props.info.telefono.map((item) =>
                    <Typography align='right' variant='body2' key={item}>
                      {item}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              :
              null
            }
            {props.info.email.length > 0 ?
              <Grid container alignItems='stretch'>
                <Grid item>
                  <Typography variant="body2" component="p">
                    Email:
            </Typography>
                </Grid>
                <Grid item>
                  {props.info.email.map((item) =>
                    <Typography variant="body2" component="p" align='right' key={item}>
                      {item.toLowerCase()}
                    </Typography>
                  )}
                </Grid>
              </Grid>
              :
              null
            }

          </CardContent>
          {/* <CardActions disableSpacing>
            <Button size="small" style={{ marginLeft: 'auto' }} aria-label="Editar" onClick={handleOpen}>Lapiz</Button>
          </CardActions> */}
        </Card>
      </motion.div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        disableBackdropClick
        disableEscapeKeyDown
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paperModal}>
            <Typography variant='h6'>
              Actualizacion datos cliente {props.info.kunnr}
            </Typography>
            <Typography variant='subtitle1'>
              Telefonos:
            </Typography>
            {listPhone.map(phone => {
              return (
                <p>{phone}</p>
              )
            })}
            < p > posibilidad de agregar mas</p>
            <p>Emails:</p>
            {listEmail.map(email => {
              return (
                <p>{email}</p>
              )
            })}
            <p>posibilidad de agregar mas</p>
            agregar horarios de atencion

          </div>
        </Fade>
      </Modal>
    </Grid >
  )
}
import React, { useEffect, useState, useContext } from "react";
import axios from 'axios'
import { AccountContext } from '../accounts/Accounts'
import { useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import Loading from '../Varios/Loading';

import {
  Container,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  makeStyles,
  Grid,
  Button,
  Hidden,
  Card,
  CardContent,
  CardMedia
} from "@material-ui/core";

import { imgSinFoto } from '../../Media/ordenes/Fotos/sku_sin_foto.png'

import andina from '../../Media/ordenes/andina.png'
import { orderDetail } from '../aws_urls'
function importAll(r) {
  return r.keys().map(r);
}

const imagenes = importAll(require.context('../../Media/ordenes/Fotos', false, /\.(png|jpe?g|svg)$/));

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 40,
    display: 'flex'
  },
  link: {
    textDecoration: 'none',
    color: '#fdba9a'
  },
  title: {
    // paddingTop: '40px',
    paddingBottom: '20px',
    // color: '#666'
  },
  subTitle
    : {
    paddingTop: '30px',
    paddingBottom: '20px',
    // color: '#666'
  },
  alignIcon: {
    verticalAlign: "middle",
    display: "inline-flex",
    width: "100%",
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 15,
  },
  Box: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  cover: {
    minWidth: 100,
    minHeight: 100,
    maxWidth: 100,
    maxHeight: 100,
    backgroundSize: 'cover'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  coverImg: {
    height: '100%',
    width: '100%'
  },
}));

const findImagen = (id) => {
  console.log(id)
  for (var i = 0; i < imagenes.length; i++) {
    if (imagenes[i].indexOf(id) !== -1) {
      return imagenes[i]
    }
  }
  return imgSinFoto
}

const DetallePedido = () => {

  // const dispatch = useDispatch();
  const { idPedido } = useParams();
  const classes = useStyles();
  const { getSession } = useContext(AccountContext)
  const [datosPedido, setDatosPedido] = useState(null)
  const [error, setError] = useState(null)
  // const datosPedidos = useSelector((state) => state.datosPedidos);

  useEffect(() => {
    // if (idPedido === null) {
    getSession()
      .then(async (user) => {
        var rut = user['custom:rut'].replace('.', '').replace('.', '')
        rut = ('0000000000' + rut).slice(-10)
        const url = `${orderDetail}?rut=81201000-K&pedido=${idPedido}`

        await axios
          .get(url, { headers: user.headers })
          .then(data => {
            if (data.data.status === 200) {
              setDatosPedido(data.data.payload)
            }
            else {
              if (data.data.status === 400) {
                setDatosPedido([])
              }
              else {
                setDatosPedido([])
                setError('noAuth')
              }
            }
          })
      })

  }, [idPedido, getSession]);

  // useEffect(() => {
  //   if (datosPedidos.id != null) {
  //     console.log("validar que puede ver este pedido");
  //     dispatch(valAuth(idPedido));
  //   }
  // }, [datosPedidos.id]);

  // useEffect(() => {
  //   if (datosPedidos.hasAuth != null) {
  //     console.log("cargar pedido");
  //     dispatch(loadPedido(idPedido));
  //   }
  //   return () => {
  //     console.log("limpiar");
  //   };
  // }, [datosPedidos.id]);

  if (datosPedido === null) {
    return (
      <Loading />
    );
  }
  else {
    if (datosPedido.length === 0) {
      if (error === null) {
        return (
          <div><h1>noData</h1></div>
        )
      }
      else {
        return (
          <div><h1>noAuth</h1></div>
        )
      }
    }
    else {
      return (
        <Container maxWidth="lg" className={classes.root}>
          <Grid container justify="center">

            <Grid item xs={12} sm={8}>
              <Typography variant="h4" className={classes.title} align='left'>DETALLE DEL PEDIDO</Typography>
              <Grid container>
                <Grid item xs={12}>
                  <Typography>ID Orden: {datosPedido.pedido}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Fecha pedido: {datosPedido.fechaEntrega}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>Estado:{datosPedido.status}</Typography>
                </Grid>
              </Grid>
              <Typography variant="h5" className={classes.subTitle}>Productos</Typography>
              <Hidden xsDown>
                <Table style={{ paddingLeft: "30px" }}>
                  <TableHead style={{ backgroundColor: '#fdba9a', color: 'white' }}>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body2">
                          <strong>Nombre</strong>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          <strong>Cantidad</strong>
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          <strong>Id Producto</strong>
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datosPedido.items != null
                      ? datosPedido.items.map((item) => {
                        return (
                          <TableRow key={item.sku}>
                            <TableCell>
                              <Typography>{item.descripcion}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>{item.cantIngresado}</Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>{item.sku}</Typography>
                            </TableCell>
                          </TableRow>
                        );
                      })
                      : null}
                  </TableBody>
                </Table>
              </Hidden>
              <Hidden smUp>
                {datosPedido.items != null
                  ? datosPedido.items.map((item) => {
                    return (
                      <Detalle item={item} />
                    )
                  })
                  : null
                }
              </Hidden>
              <div style={{ textAlign: 'right', marginTop: 20 }}>
                <Link to={`/Pedidos/`} className={classes.link}>
                  <Button variant="contained" color="primary">
                    Volver
            </Button>
                </Link>
              </div>
            </Grid>
            <Hidden xsDown>
              <Grid item xs={4}>
                <img
                  src={andina}
                  style={{ width: "100%", paddingTop: 60 }}
                  alt=''
                />
              </Grid>
            </Hidden>
          </Grid>

        </Container>
      )
    }
  }
  // } else {
  //   if (datosPedidos.error === null) {
  //     return (
  //       
  //     )
  //   }
  //   else {
  //     return (
  //       <h1>{datosPedidos.error.error}</h1>
  //     )
  //   }
  // }
};

export default DetallePedido;

const Detalle = ({ item }) => {
  const classes = useStyles()
  return (
    <Card style={{ marginTop: 10, width: '100%', display: 'flex' }}>
      <div className={classes.cover}>
        <CardMedia
          className={classes.coverImg}
          image={findImagen(item.sku)}
          title="Live from space album cover"
          component='img'
        />
      </div>

      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant='h6'>
            {item.descripcion}
          </Typography>
          <Grid container>
            <Grid item xs={9}>
              {item.sku}
            </Grid>
            <Grid item xs={3}>
              {item.cantIngresado}
            </Grid>
          </Grid>
        </CardContent>
      </div>
    </Card>
  )
}
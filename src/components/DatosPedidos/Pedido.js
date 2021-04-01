import React, { Fragment, useState, useEffect, useContext } from 'react'
import { AccountContext } from '../accounts/Accounts'
import axios from 'axios'

import { Link } from 'react-router-dom';
import Loading from '../Varios/Loading';
// import {
//   getPedidos
// } from '../../actions/Pedidos'
// import { setLocation } from '../../actions/auth'
// import Loading from '../elemComunes/Loading';

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  Container,
  Grid,
  TableFooter,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
  Checkbox,
  ListItemText,
  Hidden,
  Card,
  CardContent,
  Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// import Home from '../Home/Home';
import botellas from '../../Media/ordenes/botellas.jpg'
import { orderList } from '../aws_urls'
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 40
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
    maxWidth: 250,
  },
}))


const Pedido = () => {

  const classes = useStyles()
  const { getSession } = useContext(AccountContext)
  // const dispatch = useDispatch()
  // const auth = useSelector(state => state.auth)
  // const Pedidos = useSelector((state) => state.Pedidos);
  const [pedidos, setPedidos] = useState(null)
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [lista, setLista] = useState(null)
  const [optIdCliente, setOptIDCliente] = useState([])
  const [selCliente, setSelCliente] = useState([])

  const [optStatus, setOptStatus] = useState([])
  const [selStatus, setSelStatus] = useState([])

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

  useEffect(() => {
    if (pedidos === null) {
      getSession()
        .then(async (user) => {
          var rut = user['custom:rut'].replace('.', '').replace('.', '')
          rut = ('0000000000' + rut).slice(-10)
          const url = `${orderList}?rut=81201000-K`

          await axios
            .get(url, { headers: user.headers })
            .then(data => {
              if (data.data.status === 200) {
                if(typeof data.data.payload === 'string'){
                  setLista([])
                  setPedidos([])
                } else{
                  setLista(data.data.payload)
                  setPedidos(data.data.payload)
                }
                var aux = []
                for (let i = 0; i < data.data.payload.length; i++) {
                  if (aux.indexOf(data.data.payload[i].kunnr) === -1) {
                    aux.push(data.data.payload[i].kunnr)
                  }
                }
                aux.sort()
                setOptIDCliente(aux)

                var aux2 = []
                for (let i = 0; i < data.data.payload.length; i++) {
                  if (aux2.indexOf(data.data.payload[i].status) === -1) {
                    aux2.push(data.data.payload[i].status)
                  }
                }
                aux2.sort()
                setOptStatus(aux2)
              }
              else {
                setPedidos([])
              }
            })
        })
    }
  }, [pedidos, getSession])

  useEffect(() => {
    if (pedidos != null) {
      if (selStatus.length === 0 && selCliente.length === 0) {
        setLista(pedidos)
      }
      else {
        if (selCliente.length === 0) {
          let aux = []
          for (let i = 0; i < pedidos.length; i++) {
            if (selStatus.indexOf(pedidos[i].status) !== -1) {
              aux.push(pedidos[i])
            }
          }
          setLista(aux)
        }
        else {
          if (selStatus.length === 0) {
            let aux = []
            for (let i = 0; i < pedidos.length; i++) {
              if (selCliente.indexOf(pedidos[i].kunnr) !== -1) {
                aux.push(pedidos[i])
              }
            }
            setLista(aux)
          }
          else {
            let aux = []
            for (let i = 0; i < pedidos.length; i++) {
              if (selCliente.indexOf(pedidos[i].kunnr) !== -1 && selStatus.indexOf(pedidos[i].status) !== -1) {
                aux.push(pedidos[i])
              }
            }
            setLista(aux)
          }
        }
      }
    }
  }, [pedidos, selStatus, selCliente])


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  }

  const handleChange = (event) => {
    setSelCliente(event.target.value);
  }
  const handleChangeStatus = (event) => {
    setSelStatus(event.target.value);
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  if (pedidos === null) {
    return (
      <Loading />
    )
  }
  else {
    if (pedidos.length === 0) {
      return (
        <div>
          no data
        </div>
      )
    }
    else {
      return (
        <Fragment>
          <Container maxWidth="lg" className={classes.root}>
            <Grid container justify='center'>

              <Grid item xs={12} md={8}>
                <Typography variant='h4' className={classes.title} align='left'>
                  Pedidos
                </Typography>
                {optIdCliente.length > 1 ?
                  <FormControl className={classes.formControl}>
                    <InputLabel id="clienteLabel">Id Cliente</InputLabel>
                    <Select
                      labelId="cliente"
                      id="cliente"
                      multiple
                      value={selCliente}
                      onChange={handleChange}
                      input={<Input />}
                      renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                    >
                      {optIdCliente.map((id) => (
                        <MenuItem key={id} value={id}>
                          <Checkbox checked={selCliente.indexOf(id) > -1} />
                          <ListItemText primary={id} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  : null}

                {optStatus.length > 1 ?
                  <FormControl className={classes.formControl}>
                    <InputLabel id="comunaLabel">Estado Pedido</InputLabel>
                    <Select
                      labelId="status"
                      id="status"
                      multiple
                      value={selStatus}
                      onChange={handleChangeStatus}
                      input={<Input />}
                      renderValue={(selected) => selected.join(', ')}
                      MenuProps={MenuProps}
                    >
                      {optStatus.map((id) => (
                        <MenuItem key={id} value={id}>
                          <Checkbox checked={selStatus.indexOf(id) > -1} />
                          <ListItemText primary={id} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  : null}

                <Hidden only={'xs'}>
                  <Table style={{ paddingLeft: '30px' }}>
                    <TableHead style={{ backgroundColor: '#fdba9a', color: 'white' }}>
                      <TableRow>
                        {optIdCliente.length > 1 ?
                          <TableCell>
                            <Typography variant='body2'>
                              <strong>ID Cliente</strong>
                            </Typography>
                          </TableCell>
                          : null}
                        <TableCell>
                          <Typography variant='body2'>
                            <strong>ID Orden</strong>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>
                            <strong>Fecha Pedido</strong>
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body2'>
                            <strong>Estado</strong>
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {lista != null ?
                        lista
                          .filter((item, index) => {
                            return (index >= page * rowsPerPage && index < (page + 1) * rowsPerPage) || rowsPerPage === -1
                          })
                          .map(item =>
                            <TableRow key={item.pedido}>
                              {optIdCliente.length > 1 ?
                                <TableCell>
                                  <Typography>{item.kunnr}</Typography>
                                </TableCell>
                                : null}
                              <TableCell>
                                <Link to={`/Pedidos/${item.pedido}/`} className={classes.link}>
                                  <Typography><strong>{item.pedido}</strong></Typography>
                                </Link>
                              </TableCell>
                              <TableCell>
                                <Typography>{item.fechaEntrega}</Typography>
                              </TableCell>
                              <TableCell>
                                <Typography>{item.status}</Typography>
                              </TableCell>
                            </TableRow>
                          )
                        : null
                      }
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 25, { label: 'Todos', value: -1 }]}
                          colSpan={optIdCliente.length > 0 ? 4 : 3}
                          count={lista.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            inputProps: { 'aria-label': 'Pedodos por pagina' },
                            native: true,
                          }}
                          onChangePage={handleChangePage}
                          onChangeRowsPerPage={handleChangeRowsPerPage}
                          labelDisplayedRows={
                            ({ from, to, count }) => {
                              return '' + from + '-' + to + ' de ' + count
                            }
                          }
                          labelRowsPerPage={'Pedidos por pagina'}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </Hidden>
                <Hidden smUp>
                  {lista != null ?
                    lista
                      .filter((item, index) => {
                        return (index >= page * rowsPerPage && index < (page + 1) * rowsPerPage) || rowsPerPage === -1
                      })
                      .map(item => {
                        return (
                          <ItemPedido item={item} key={item.pedido} />
                        )
                      })
                    : null}

                </Hidden>
                {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
              </Grid>
              <Hidden smDown>

                <Grid item sm={4}>
                  <img src={botellas} style={{ width: '100%', paddingTop: 60 }} alt='' />
                </Grid>
              </Hidden>
            </Grid>
          </Container>
        </Fragment>
      )
    }
  }
}

export default Pedido


const ItemPedido = ({ item }) => {
  const classes = useStyles()
  return (
    <Card style={{ marginTop: 10 }}>
      <CardContent>
        <Typography variant='h6'>
          #{item.pedido}
        </Typography>
        <Grid container>
          <Grid item xs={6}>
            {item.fechaEntrega}
          </Grid>
          <Grid item xs={6}>
            {item.kunnr}
          </Grid>
          <Grid item xs={6} style={{ alignSelf: 'center' }}>
            En Camino
          </Grid>
          <Grid item xs={6}>
            <Link to={`/Pedidos/${item.pedido}/`} className={classes.link}>
              <Button color="primary">
                Detalle
            </Button>
            </Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

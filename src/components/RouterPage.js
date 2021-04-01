import React, { useState, useEffect, useContext, lazy, Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import { AccountContext } from './accounts/Accounts'
import Menu from './Menu/Menu';
import Loading from './Varios/Loading';

const EquipoFrio = lazy(() => import('./ServCliente/equipoFrio'))
const MaquinaCafe = lazy(() => import('./ServCliente/maquinaCafe'))
const PostMix = lazy(() => import('./ServCliente/postMix'))
const ServicioCliente = lazy(() => import('./ServCliente/servicioCliente'))

const NotLogged = lazy(() => import('./HomeNL/Index'))
const Logged = lazy(() => import('./Home/Logged'))
const Terms = lazy(() => import('./Varios/Terms'))
const SingUp = lazy(() => import('./HomeNL/Signup'))
const Recovery = lazy(() => import('./HomeNL/Recovery'))

const UserInfo = lazy(() => import('./DatosComerciales/UserInfo'))
const Ordenes = lazy(() => import('./DatosPedidos/Pedido'))
const DetallePedido = lazy(() => import('./DatosPedidos/DetallePedido'))

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    [theme.breakpoints.down('xs')]: {
      background: 'red',
    },

  },
  root2: {
    display: 'flex',
    minHeight: '100vh',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    }
  },
}));

export default function RouterPage() {

  const classes = useStyles();
  const { getSession } = useContext(AccountContext)

  const [loading, setLoading] = useState(true)
  const [logged, setLogged] = useState(false)
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getSession()
      .then((d) => {
        console.log('ASDF', d)
        setLogged(true)
        setLoading(false)
      })
      .catch(e => {
        setLoading(false)
      })
  })

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (loading) {
    return (
      <Loading />
    )
  }
  else {
    return (
      <Router>
        <div className={logged ? classes.root2 : classes.root}>
          <Menu open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} logged={logged} />

          <main className={classes.content}>
            <div className={classes.toolbar} />

            {logged ?
              <Suspense fallback={<div></div>}>
                <Switch>
                  <Route exact path='/' component={Logged} />
                  <Route exact path='/terms' component={Terms} />

                  <Route exact path='/userinfo' component={UserInfo} />

                  <Route exact path='/Pedidos' component={Ordenes} />
                  <Route exact path='/Pedidos/:idPedido' component={DetallePedido} />

                  <Route exact path='/formCliente/equipoFrio' component={EquipoFrio} />
                  <Route exact path='/formCliente/maquinaCafe' component={MaquinaCafe} />
                  <Route exact path='/formCliente/postMix' component={PostMix} />
                  <Route exact path='/formCliente/servicioCliente' component={ServicioCliente} />
                  <Route path='/' component={Logged} />
                </Switch>
              </Suspense>
              :
              <Suspense fallback={<div></div>}>
                <Switch>
                  <Route exact path='/terms' component={Terms} />
                  <Route exact path='/accounts/signup' component={SingUp} />
                  <Route exact path='/accounts/recovery' component={Recovery} />
                  <Route path='/' component={NotLogged} />
                </Switch>
              </Suspense>
            }
          </main>
        </div>
      </Router >
    )
  }
}

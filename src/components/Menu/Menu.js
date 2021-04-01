import React, { Fragment, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ListAltIcon from '@material-ui/icons/ListAlt';
import CallIcon from '@material-ui/icons/Call';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


import { AccountContext } from '../accounts/Accounts'
import { PostMix, Cooler, MaquinaCafe, CallCenter } from './icones'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: 'red',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    backgroundColor: 'red',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  icone: {
    color: 'white',
  },
  link: {
    textDecoration: 'none',
    color: 'white'
  },
  subMenu: {
    backgroundColor: 'black',
    paddingLeft: 10
  },
  bold: {
    fontWeight: '700!important'
  }
}));

function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 2,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function Menu({ open, handleDrawerOpen, handleDrawerClose, logged }) {

  const classes = useStyles();
  const theme = useTheme();

  return (
    <Fragment>
      <CssBaseline />
      <ElevationScroll>
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            {logged &&
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: open,
                })}
              >
                <MenuIcon />
              </IconButton>
            }
            <Titulo />
          </Toolbar>

        </AppBar>
      </ElevationScroll>
      {logged &&
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <ItemsMenu />
          <Logout />
        </Drawer>
      }
    </Fragment>
  );
}

const ItemsMenu = () => {
  const classes = useStyles();
  const [openCS, setOpenCS] = useState(false)

  const items = [
    {
      text: 'Home',
      icone: <HomeIcon />,
      to: '/'
    },
    {
      text: 'Datos Comerciales',
      icone: <AccountCircleIcon />,
      to: '/userinfo'
    },
    {
      text: 'Pedidos',
      icone: <ListAltIcon />,
      to: '/pedidos'
    }
  ]

  const itemsServCliente = [
    {
      text: 'Equipos de Frío',
      icone: <Cooler />,
      to: '/formCliente/equipoFrio'
    },
    {
      text: 'Máquinas de Café',
      icone: <MaquinaCafe />,
      to: '/formCliente/maquinaCafe'
    },
    {
      text: 'Post Mix',
      icone: <PostMix />,
      to: '/formCliente/postMix'
    },
    {
      text: 'Servicio al Cliente',
      icone: <CallCenter />,
      to: '/formCliente/servicioCliente'
    },
  ]
  return (
    <List>
      {items.map((item, index) => (
        <Link to={item.to} className={classes.link} key={index}>
          <ListItem button>
            <ListItemIcon className={classes.icone}> {item.icone} </ListItemIcon>
            <ListItemText primary={item.text} />

          </ListItem>
        </Link>
      ))}

      <ListItem
        button
        onClick={() => setOpenCS(!openCS)}
      >
        <ListItemIcon className={classes.icone}>
          <CallIcon />
        </ListItemIcon>
        <ListItemText primary={'Centro de Soluciones'} className={classes.link} />
      </ListItem>
      {openCS ?
        <div className={classes.subMenu}>
          {itemsServCliente.map((item, index) => (
            <Link to={item.to} className={classes.link} key={index}>
              <ListItem button>
                <ListItemIcon className={classes.icone}> {item.icone} </ListItemIcon>
                <ListItemText primary={item.text} />

              </ListItem>
            </Link>
          ))}
        </div>
        :
        null
      }
    </List>
  )
}

const Logout = () => {
  const classes = useStyles();
  const { logout } = useContext(AccountContext)
  return (
    <div style={{ flexGrow: 1, }}>
      <div style={{ position: 'absolute', bottom: 10, }}>
        <List>
          <Link to='/' className={classes.link}>
            <ListItem button onClick={() => {
              logout()
              window.location.href = "/"
            }} >
              <ListItemIcon className={classes.icone}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={'Cerrar Sesion'} />
            </ListItem>
          </Link>
        </List>
      </div>
    </div>
  )
}

const Titulo = () => {
  const classes = useStyles();
  return (
    <Link to='/' className={classes.link}>
      <Typography variant="h6" noWrap>
        Portal Cliente
      </Typography>
    </Link>
  )
}
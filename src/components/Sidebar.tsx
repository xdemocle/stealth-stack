import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import classNames from 'classnames'
import React, { useEffect } from 'react'
import Logo from '../assets/logo.png'
import useGlobal from '../common/globalStateHook'
import MainLinks from './MainLinks'

const drawerWidth = '17rem'

const Sidebar: React.FC = () => {
  const classes = useStyles()
  const theme = useTheme()
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'))
  const [globalState, globalActions] = useGlobal()

  useEffect(() => {
    if (isDownMd) {
      globalActions.updateIsSidebarOpen(false)
    } else {
      globalActions.updateIsSidebarOpen(true)
    }
  }, [globalActions, isDownMd])

  const handleDrawerToggle = () => {
    globalActions.updateIsSidebarOpen(!globalState.isSidebarOpen)
  }

  return (
    <Hidden smDown>
      <Drawer
        variant="permanent"
        anchor="left"
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !globalState.isSidebarOpen && classes.drawerPaperClose
          )
        }}
        ModalProps={{
          // Better open performance on mobile.
          keepMounted: true
        }}
        open={globalState.isSidebarOpen}
      >
        <div
          className={classNames(
            classes.toolbar,
            globalState.isSidebarOpen && classes.toolbarOpen
          )}
        >
          <Tooltip
            title={`${
              globalState.isSidebarOpen ? 'Collapse' : 'Expand'
            } sidebar`}
            placement="right"
          >
            <div className={classes.toolbarHeader}>
              <IconButton
                disableRipple
                onClick={handleDrawerToggle}
                aria-label="toggle drawer"
                className={classNames(classes.buttonLogoNormal)}
              >
                <img src={Logo} alt="logo.png" width="48" />
              </IconButton>
              <Typography variant="subtitle1" className={classes.toolbarTitle}>
                Altcash
              </Typography>
            </div>
          </Tooltip>

          <MainLinks isSidebarOpen={globalState.isSidebarOpen} />
        </div>
      </Drawer>
    </Hidden>
  )
}

export default Sidebar

const useStyles = makeStyles((theme: Theme) => ({
  hide: {
    display: 'none'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    height: '100%',
    width: drawerWidth,
    overflow: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: '6rem'
  },
  toolbar: {
    position: 'fixed',
    overflow: 'hidden',
    width: '6rem',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  toolbarOpen: {
    width: drawerWidth
  },
  toolbarHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    padding: '1.5rem',
    ...theme.mixins.toolbar
  },
  toolbarTitle: {
    margin: '0 1.5rem'
  },
  buttonLogoNormal: {
    padding: 0,
    backgroundColor: 'transparent !important'
  }
}))

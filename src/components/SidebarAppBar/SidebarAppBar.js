import React, { PureComponent } from 'react';
import styles from './SidebarAppBar.css';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  IconButton,
  Toolbar,
  Tooltip,
  Typography
} from '@material-ui/core';
import classNames from 'classnames';
import MenuIcon from '@material-ui/icons/Menu';

class SidebarAppBar extends PureComponent {
  render() {
    const { classes, toggle, toggled } = this.props;

    return (
      <AppBar className={classNames(classes.appBar)} color="default">
        <Toolbar disableGutters={true}>
          <Tooltip title={(toggled ? 'Hide ' : 'Show ') + 'sidebar'}>
            <IconButton
              aria-label="open sidebar"
              className={classNames(classes.menuButton)}
              color="inherit"
              onClick={toggle}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>

          <Typography variant="h6" color="inherit">
            <img
              src="https://i.imgur.com/juFY6Hw.jpg"
              alt="logo"
              width="50px"
            />
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles, { withTheme: true })(SidebarAppBar);

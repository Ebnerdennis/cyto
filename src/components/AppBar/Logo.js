import React, { PureComponent } from 'react';
import styles from './PrimaryAppBar.css';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

class Logo extends PureComponent {
  render() {
    return (
      <Typography variant="h6" color="inherit">
        <img src="https://i.imgur.com/juFY6Hw.jpg" alt="logo" width="50px" />
      </Typography>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Logo);

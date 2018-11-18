import React, { Component } from 'react';
import styles from './DeleteCategoryDialog.css';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

class DeleteCategoryDialog extends Component {
  render() {
    const {
      deleteCategory,
      categoryIdentifier,
      description,
      open,
      onClose
    } = this.props;
    const dialogTitle = `Delete ${description}?`;
    const dialogContentText = `Images categorized as ${description} won’t be deleted.`;

    return (
      <Dialog open={open} onClose={() => onClose()}>
        <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContentText}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => onClose()} color="primary">
            Cancel
          </Button>

          <Button
            onClick={() => deleteCategory(categoryIdentifier)}
            color="primary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles, { withTheme: true })(DeleteCategoryDialog);

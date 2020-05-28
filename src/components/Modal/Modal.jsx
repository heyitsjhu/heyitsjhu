import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop, Fade, Modal as MUIModal, Paper } from '@material-ui/core';
import classnames from 'classnames';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  paper: {
    height: '70vh',
    width: '100%',
    maxWidth: 900,
    outline: 0,
    backgroundColor: theme.palette.background.dark,
  },
}));

export default ({ children, className, open, onCloseHandler }) => {
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <MUIModal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
      className={classnames('DLComp-modal', classes.modal, className)}
      closeAfterTransition
      disableEnforceFocus
      onClose={onCloseHandler}
      open={open}
    >
      <Paper className={classnames('DLComp-modal-paper', classes.paper)} elevation={3}>
        <Fade in={open}>{children}</Fade>
      </Paper>
    </MUIModal>
  );
};

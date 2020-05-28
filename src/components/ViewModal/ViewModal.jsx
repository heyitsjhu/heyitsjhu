import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop, Fade, Modal, Paper } from '@material-ui/core';
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
    backgroundColor: theme.palette.grey[900],
  },
}));

export default ({ open, setOpenModal }) => {
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
      className={classnames('DLComp-modal', classes.modal)}
      closeAfterTransition
      disableEnforceFocus
      onClose={() => setOpenModal(false)}
      open={open}
    >
      <Fade in={open}>
        <Paper className={classnames('DLComp-modal-paper', classes.paper)} elevation={3}>
          {/* <CoronavirusView /> */}
        </Paper>
      </Fade>
    </Modal>
  );
};

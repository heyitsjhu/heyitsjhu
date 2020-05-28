import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop, Box, CircularProgress, Fade } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
}));

export default (props) => {
  const classes = useStyles();

  return (
    <Fade in={props.isLoading}>
      <Box className={classes.container}>
        <CircularProgress />
      </Box>
    </Fade>
  );
};

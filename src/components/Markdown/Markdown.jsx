import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Markdown from 'react-markdown';

import renderers from './renderers';

const useStyles = makeStyles((theme) => ({
  markdownContainer: {
    width: '100%',
  },
}));

export default (props) => {
  const classes = useStyles();
  return (
    <Markdown className={classes.markdownContainer} source={props.source} renderers={renderers} />
  );
};

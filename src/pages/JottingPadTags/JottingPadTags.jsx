import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, ButtonBase, Typography } from '@material-ui/core';
import classnames from 'classnames';

import { Post } from '../../components';
import { ROUTES } from '../../const';
import { useCopy } from '../../i18n';
import { AppContext } from '../../store';
import PageLayout from '../PageLayout/PageLayout';
// import { initialState, stateReducer } from './utils';
import * as PostUtils from '../../utils/postHelpers';

const useStyles = makeStyles(({ palette, spacing }) => ({
  jottingPadPostLayout: {},
  paginationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: spacing(4),
    paddingTop: spacing(2),
    borderTop: `1px solid ${palette.primary.main}`,
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    color: palette.grey[600],
  },
  buttonOverline: {
    fontSize: '0.65rem',
    fontWeight: 300,
    lineHeight: 1.6,
    color: palette.primary.main,
  },
  // button: { fontSize: 14, textTransform: 'uppercase' },
  previous: { alignItems: 'flex-start' },
  next: { alignItems: 'flex-end' },
}));

export default (props) => {
  const [appState, dispatch] = useContext(AppContext);
  const { t } = useCopy();
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [postIndex, setPostIndex] = useState(null);

  console.log(location);

  return (
    <PageLayout pageName="jottingPadTags" className={classes.jottingPadPostLayout}>
      <Typography>JHFKLSJFKLSJDFLK</Typography>
    </PageLayout>
  );
};

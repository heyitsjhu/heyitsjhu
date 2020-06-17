import React, { useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, ButtonBase, Typography } from '@material-ui/core';
import classnames from 'classnames';

import posts from '../../blog/';
import { Markdown } from '../../components';
import { useCopy } from '../../i18n';
import PageLayout from '../PageLayout/PageLayout';
import { initialState, stateReducer } from './utils';

const useStyles = makeStyles(({ palette, spacing }) => ({
  jottingPadLayout: {},
  paginationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: spacing(4),
    paddingTop: spacing(2),
    borderTop: `1px solid ${palette.grey[800]}`,
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    color: palette.text.primary,
  },

  button: { fontSize: 14, textTransform: 'uppercase' },
  prev: { alignItems: 'flex-start' },
  next: { alignItems: 'flex-end' },
}));

export default (props) => {
  const { t } = useCopy();
  const classes = useStyles();
  const history = useHistory();
  const [state, dispatchState] = useReducer(stateReducer, initialState);
  const { index, postContent } = state;

  const stateHandler = (key) => dispatchState({ key });

  const handleClick = (key) => {
    // push to history
    stateHandler(key);
  };

  const renderButton = (type, post) => {
    return (
      <Box className={classnames([classes.buttonContainer, classes[type]])}>
        <Typography className={classes.buttonOverline} color="textPrimary" variant="overline">
          {type}
        </Typography>
        <ButtonBase
          className={classes.button}
          onClick={() => handleClick(type)}
          disableRipple
          size=""
        >
          {post.title}
        </ButtonBase>
      </Box>
    );
  };

  useEffect(() => {
    const post = posts[index.current];

    fetch(post.file)
      .then((resp) => resp.text())
      .then((post) => dispatchState({ key: 'post', post }));
  }, [posts, state.index]);

  console.log(state);

  return (
    <PageLayout pageName="jottingPad" className={classes.jottingPadLayout}>
      <Markdown source={postContent} />
      <Box className={classes.paginationContainer}>
        {posts[index.prev] && renderButton('prev', posts[index.prev])}
        <Box />
        {posts[index.next] && renderButton('next', posts[index.next])}
      </Box>
    </PageLayout>
  );
};

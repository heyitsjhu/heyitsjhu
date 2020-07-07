import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, ButtonBase, Typography } from '@material-ui/core';
import classnames from 'classnames';

import Post from '../../components/Post/Post';
import { ROUTES } from '../../const';
import { useCopy } from '../../i18n';
import { AppContext } from '../../store';
import PageLayout from '../PageLayout/PageLayout';
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
  const [appState, _] = useContext(AppContext);
  const { t } = useCopy();
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [postIndex, setPostIndex] = useState(null);

  const { posts } = appState.jottingPad;

  const setPostFromURL = () => {
    const urlSlug = location.pathname.split('/')[2];
    const post = appState.jottingPad.posts.find((post, index) => {
      const postSlug = PostUtils.getPostSlug(post);
      setPostIndex(index);
      return postSlug.value === urlSlug;
    });
    setPost(post);
  };

  useEffect(() => {
    setPostFromURL();
  }, [location.pathname]);

  const handleClick = (post) => {
    const postSlug = PostUtils.getPostSlug(post);
    history.push(`${ROUTES.JOTTINGPAD}/${postSlug.value}`);
  };

  const renderButton = (type, post) => {
    const postTitle = post.find((postPart) => postPart.type === 'title');
    return (
      <Box className={classnames([classes.buttonContainer, classes[type.toLowerCase()]])}>
        <Typography className={classes.buttonOverline} variant="overline">
          {type}
        </Typography>
        <ButtonBase className={classes.button} disableRipple onClick={() => handleClick(post)}>
          {postTitle.value}
        </ButtonBase>
      </Box>
    );
  };

  return typeof post !== 'undefined' ? (
    <PageLayout pageName="jottingPadPost" className={classes.jottingPadPostLayout}>
      <Post post={post} />
      <Box className={classes.paginationContainer}>
        {posts[postIndex + 1] &&
          renderButton(t('pages.JottingPadPost.Button.previous'), posts[postIndex + 1])}
        <Box />
        {posts[postIndex - 1] &&
          renderButton(t('pages.JottingPadPost.Button.next'), posts[postIndex - 1])}
      </Box>
    </PageLayout>
  ) : (
    <Redirect to={ROUTES.NOTFOUND} />
  );
};

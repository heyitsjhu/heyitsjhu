import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import * as PostUtils from '../../utils';
import { PostRenderer } from '../renderers';

const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  postContainer: {
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: `${spacing(6)}px ${spacing(3)}px`,
    width: '100%',
    maxWidth: 960,
  },
}));

export default ({ post }) => {
  const classes = useStyles();
  const postDate = PostUtils.getPostDate(post);
  const postTags = PostUtils.getPostTags(post);
  const postTitle = PostUtils.getPostTitle(post);
  const postParts = PostUtils.getPostParts(post);

  return (
    <Box className={classes.postContainer} component="article">
      {PostRenderer('postTitle', postTitle)}
      {PostRenderer('postDate', postDate)}
      {PostRenderer('postTags', postTags)}
      {PostRenderer('postContents', postParts)}
    </Box>
  );
};

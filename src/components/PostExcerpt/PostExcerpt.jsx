import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { useCopy } from '../../i18n';
import * as PostUtils from '../../utils';
import { PostRenderer } from '../renderers';

const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  postExcerptContainer: {
    position: 'relative',
    padding: `${spacing(6)}px ${spacing(3)}px`,
    width: '100%',
    minWidth: 567,
    maxWidth: '50%',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    border: '1px solid transparent',
    boxShadow: '0.125rem 0.375rem 0.5rem 0 rgba(0,0,0,0)',
    transform: 'scale(1)',
    transition: 'all 500ms linear',

    '&:hover': {
      backgroundColor: '#000',
      borderColor: '#ccc',
      boxShadow: '0.125rem 0.375rem 0.5rem 0 rgba(0,0,0,.6)',
      transform: 'scale(1.01)',
      cursor: 'pointer',
    },
  },
}));

export default ({ post, onExcerptClick }) => {
  const classes = useStyles();
  const { t } = useCopy();
  const postDate = PostUtils.getPostDate(post);
  const postTags = PostUtils.getPostTags(post);
  const postSlug = PostUtils.getPostSlug(post);
  const postTitle = PostUtils.getPostTitle(post);

  const handleClick = () => {
    onExcerptClick(postSlug);
  };

  return (
    <Box className={classes.postExcerptContainer} onClick={handleClick}>
      {PostRenderer('postDate', postDate)}
      {PostRenderer('postTags', postTags)}
      {PostRenderer('excerptTitle', postTitle)}
    </Box>
  );
};

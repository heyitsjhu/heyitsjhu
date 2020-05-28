import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import classnames from 'classnames';

import { IconButton } from '../../components';
import * as Utils from '../../utils';

const useStyles = makeStyles(({ palette, transitions, spacing, zIndex }) => ({
  pageLayout: {
    position: 'relative',
    margin: spacing(5),
    padding: spacing(4),
    width: '100%',
    height: `calc(100% - ${spacing(10)}px)`,
    backgroundColor: 'rgba(0,0,0,0.85)',
    border: `1px solid ${palette.grey[600]}`,
    transition: `all ${transitions.duration.complex}ms linear`,
    zIndex: zIndex.pageLayout,
    overflowY: 'scroll',
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.55)',
      transition: `all ${transitions.duration.complex}ms ${transitions.easing.easeIn}`,
      zIndex: -1,
    },
  },
  fullscreen: {
    margin: 0,
    height: '100%',
    borderColor: 'transparent',
    zIndex: zIndex.pageLayoutFullscreen,
  },
  fullscreenIcon: {
    position: 'absolute',
    top: spacing(1) / 2,
    right: spacing(1) / 2,
    zIndex: zIndex.fullscreenIcon,
  },
}));

export default ({ children, className, pageName, ...otherProps }) => {
  const classes = useStyles();
  const [isFullscreen, setIsFullscreen] = useState(false);
  // const location = useLocation();
  // const isHome = location.pathname === '/';

  const handleFullscreenClick = () => setIsFullscreen(!isFullscreen);

  return (
    <Box
      id={Utils.getElId('page', pageName)}
      className={classnames([
        Utils.getElClass('page', 'layout'),
        pageName && Utils.getElClass('page', pageName),
        classes.pageLayout,
        isFullscreen && classes.fullscreen,
        className,
      ])}
    >
      {isFullscreen ? (
        <IconButton
          aria-label="exit fullscreen"
          className={classes.fullscreenIcon}
          onClick={handleFullscreenClick}
        >
          <FullscreenExitIcon />
        </IconButton>
      ) : (
        <IconButton
          aria-label="enter fullscreen"
          className={classes.fullscreenIcon}
          onClick={handleFullscreenClick}
        >
          <FullscreenIcon />
        </IconButton>
      )}

      {children}
    </Box>
  );
};

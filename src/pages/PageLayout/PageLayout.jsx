import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';

import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import classnames from 'classnames';

import IconButton from '../../components/IconButton/IconButton';

import { ROUTES } from '../../const';
import * as Utils from '../../utils';

const useStyles = makeStyles(({ palette, transitions, spacing, zIndex }) => ({
  pageContainer: {
    zIndex: zIndex.pageLayout + ' !important',
  },
  scrollContainer: {
    height: '100%',
    overflowY: 'scroll',
  },
  pageLayout: {
    position: 'relative',
    margin: spacing(5),
    padding: spacing(4),
    height: `calc(100% - ${spacing(10)}px)`,
    backgroundColor: 'rgba(0,0,0,0.85)',
    border: `1px solid ${palette.grey[600]}`,
    transition: `all ${transitions.duration.complex}ms linear !important`,
    outline: 0,
    overflowY: 'scroll',
    '&::after': {
      content: '""',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.55)',
      transition: `all ${transitions.duration.complex}ms ${transitions.easing.easeIn}`,
      zIndex: -1,
    },
  },
  contentWrapper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 980,
  },
  pageActions: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    right: 0,
    padding: spacing(1) / 2,
    zIndex: zIndex.pageLayoutPageActions,
  },
  fullscreen: {
    margin: 0,
    height: '100%',
    borderColor: 'transparent',
    zIndex: zIndex.pageLayoutFullscreen,
  },
  backdropOverride: {
    backgroundColor: 'transparent',
    zIndex: 0,
  },
}));

export default ({
  children,
  className,
  disableFullscreen,
  pageActions,
  pageName,
  ...otherProps
}) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const isHome = location.pathname === ROUTES.HOME;
  const arrivedFromNav = location.state && location.state.fromNav;
  const layoutRef = useRef(null);

  const handleFullscreenClick = () => setIsFullscreen(!isFullscreen);

  const handleClose = () => {
    setIsOpen(!isOpen);

    // allow modal to fade out
    setTimeout(() => history.push(ROUTES.HOME), 400);
  };

  useEffect(() => {
    if (!isHome || arrivedFromNav) {
      setIsOpen(true);
    }
  }, [isHome, arrivedFromNav]);

  useEffect(() => {
    if (layoutRef.current) {
      // TODO: animate the scroll
      layoutRef.current.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <Modal
      aria-labelledby="simple-modal-title" // update to tie to page heading
      aria-describedby="simple-modal-description" // update to tie to page descr
      className={classnames([!isFullscreen && classes.pageContainer])}
      BackdropComponent={Backdrop}
      BackdropProps={{
        className: classes.backdropOverride,
        timeout: 300,
      }}
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      disableEnforceFocus
    >
      <Fade in={isOpen}>
        <Box
          id={Utils.getElId('page', pageName)}
          className={classnames([
            classes.pageLayout,
            isFullscreen && classes.fullscreen,
            className,
          ])}
          ref={layoutRef}
        >
          <Box className={classes.pageActions}>
            {pageActions && pageActions}
            {!disableFullscreen && (
              <IconButton
                aria-label="exit fullscreen"
                className={classes.fullscreenIcon}
                onClick={handleFullscreenClick}
              >
                {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </IconButton>
            )}
          </Box>
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};

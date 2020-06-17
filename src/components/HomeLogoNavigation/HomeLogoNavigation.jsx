import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';

import { useCopy } from '../../i18n';
import * as Utils from '../../utils';
import getAnimation from './anime';
import navMapping from './navMapping';
import paths from './paths';

const useStyles = makeStyles(({ palette, spacing, transitions, zIndex }) => ({
  homeLogoContainer: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
    zIndex: zIndex.homeLogo,
  },
  logoSvg: {
    minWidth: 96,
    maxWidth: 180,
    width: '100%',
    opacity: 1,
  },
  svgGroup: {
    stroke: 'none',
    strokeWidth: '1',
    fill: 'none',
    fillRule: 'evenodd',
  },
  svgPath: {
    transition: `fill ${transitions.duration.long}ms ${transitions.easing.easeInOut}`,
  },
  pathSet1: {
    fill: palette.grey[600],
    '&.interactive:hover': { fill: palette.grey[100], cursor: 'pointer' },
  },
  pathSet2: {
    fill: palette.primary.dark,
    '&.interactive:hover': { fill: palette.primary.main, cursor: 'pointer' },
  },
  popper: {
    marginLeft: spacing(3),
    marginRight: spacing(3),
    '&::before': {
      content: '""',
      position: 'absolute',
      right: spacing(2),
      top: '50%',
      width: spacing(6),
      borderBottom: `1px solid ${palette.grey[100]}`,
    },
  },
  popperLeft: {
    marginRight: spacing(10),
    '&::before': {
      right: spacing(2),
    },
  },
  popperRight: {
    marginLeft: spacing(10),
    '&::before': {
      left: spacing(2),
    },
  },
  comingSoon: {
    padding: spacing(2),
    color: palette.grey[300],
    fontSize: 18,
    fontWeight: 600,
    textTransform: 'uppercase',
    opacity: 0,
  },
}));

export default (props) => {
  const classes = useStyles();
  const { t } = useCopy();
  const history = useHistory();
  const viewBox = props.viewBox || '0 0 528 566';
  const [anchorEl, setAnchorEl] = useState(null);
  const [popperPlacement, setPopperPlacement] = useState('left');
  const [popperText, setPopperText] = useState('');
  const [isInteractive, setIsInteractive] = useState(false);
  const open = Boolean(anchorEl);
  const id = open ? 'transitions-popper' : undefined;

  const handleMouseOver = (event) => {
    if (!anchorEl) {
      const popper = navMapping[event.currentTarget.id];

      setPopperPlacement(popper.placement);
      setPopperText(popper.text);
      setAnchorEl(event.currentTarget);
    }
  };
  const handleMouseLeave = (event) => {
    setAnchorEl(null);
  };

  const handleClick = (navId) => (event) => {
    history.push(navMapping[navId].url, { fromNav: true });
  };

  useEffect(() => {
    if (props.isReady) {
      const animation = getAnimation(null, () => setIsInteractive(true));
      animation.play();
    }
  }, [props.isReady]);

  return (
    <Fragment>
      <Box
        className={classnames(
          Utils.getElClass('component', 'homeLogo-container'),
          classes.homeLogoContainer
        )}
      >
        <svg
          className={classnames(Utils.getElClass('component', 'homeLogo-svg'), classes.logoSvg)}
          viewBox={viewBox}
        >
          <g className={classes.svgGroup}>
            {paths.map((path, index) => (
              <path
                aria-describedby={id}
                className={classnames(
                  Utils.getElClass('component', 'homeLogo-path'),
                  classes.svgPath,
                  path.css && classes[path.css]
                  // isInteractive && 'interactive'
                )}
                d={path.d}
                id={path.navId}
                key={path.d}
                // onClick={handleClick(path.navId)}
                // onMouseOver={isInteractive ? handleMouseOver : undefined}
                // onMouseLeave={isInteractive ? handleMouseLeave : undefined}
              />
            ))}
          </g>
        </svg>
        <Typography className={classnames([classes.comingSoon, 'coming-soon'])} variant="subtitle2">
          coming soon
        </Typography>
      </Box>
      <Popper anchorEl={anchorEl} id={id} open={open} placement={popperPlacement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <div
              className={classnames(
                Utils.getElClass('component', 'homeLogo-popper'),
                classes.popper,
                popperPlacement === 'left' && classes.popperLeft,
                popperPlacement === 'right' && classes.popperRight
              )}
            >
              <Typography color="textPrimary" variant="overline">
                {t(popperText)}
              </Typography>
            </div>
          </Fade>
        )}
      </Popper>
    </Fragment>
  );
};

import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import classnames from 'classnames';

import { AppContext, SET_SPLASH_LOGO_START, SET_SPLASH_LOGO_FINISH } from '../../store';
import getAnimation from './anime';
import paths from './paths';

const useStyles = makeStyles((theme) => ({
  splashLogoContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.common.white,
    zIndex: 1000,
  },
  curtains: {
    position: 'relative',
    top: 0,
    height: 0,
    width: '50%',
    backgroundColor: '#101010',
    opacity: 0,
    '&::before': {
      content: '""',
      position: 'fixed',
      top: 0,
      width: 'calc(50%)',
      height: '100%',
      backgroundColor: '#101010',
      zIndex: -1,
    },
  },
  curtainLeft: {
    left: 0,
    borderRight: `3px solid ${theme.palette.grey[500]}`,
  },
  curtainRight: {
    right: 0,
    borderLeft: `3px solid ${theme.palette.grey[500]}`,
  },
  logoSvg: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    minWidth: 80,
    maxWidth: 150,
    transform: 'translate(-50%, -50%)',
    opacity: 1,
  },
  svgGroup: {
    stroke: 'none',
    strokeWidth: '1',
    fill: 'none',
    fillRule: 'evenodd',
  },
  svgPath: {
    fill: '#262b37',
    opacity: 0,
  },
}));

export default (props) => {
  const [appState, dispatch] = useContext(AppContext);
  const classes = useStyles();
  const viewBox = props.viewBox || '0 0 528 566';

  const onStartAnimation = (anim) => {
    dispatch({ type: SET_SPLASH_LOGO_START });
  };

  const onEndAnimation = (anim) => {
    dispatch({ type: SET_SPLASH_LOGO_FINISH });
  };

  useEffect(() => {
    const animation = getAnimation(onStartAnimation, onEndAnimation);
    animation.play();
  }, []);

  return (
    !appState.splashLogo.finished && (
      <Box className={classnames('dl-splash-container', classes.splashLogoContainer)}>
        <Box
          className={classnames([
            'dl-splash-curtain',
            'dl-splash-curtain-left',
            classes.curtains,
            classes.curtainLeft,
          ])}
        ></Box>
        <Box
          className={classnames([
            'dl-splash-curtain',
            'dl-splash-curtain-right',
            classes.curtains,
            classes.curtainRight,
          ])}
        ></Box>
        <svg className={classnames('dl-splash-logo', classes.logoSvg)} viewBox={viewBox}>
          <g className={classnames(classes.svgGroup)}>
            {paths.map((path) => (
              <path
                className={classnames([
                  path.className === 'set1' && 'logo__set--1',
                  path.className === 'set2' && 'logo__set--2',
                  classes.svgPath,
                ])}
                d={path.d}
                id={path.id}
                key={path.d}
              />
            ))}
          </g>
        </svg>
      </Box>
    )
  );
};

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import MUILink from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import classnames from 'classnames';

import constants from '../../app/constants';
import { IconButton } from '../../components';
import * as Utils from '../../utils';
import SiteLogo from '../SiteLogo/SiteLogo';
import getAnimation from './anime';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    top: 0,
    left: 0,
    padding: theme.spacing(1),
    width: '100%',
    opacity: 0,
    zIndex: theme.zIndex.header,
  },
  iconSet: {
    '& > *': {
      marginLeft: theme.spacing(1) / 2,
    },
  },
  siteLogo: {
    '&:hover path': {
      fill: theme.palette.grey[600],
      '&:nth-child(6), &:nth-child(7), &:nth-child(8)': {
        fill: theme.palette.primary.main,
      },
    },
    '& path': {
      fill: theme.palette.grey[800],
    },
  },
}));

export default (props) => {
  const classes = useStyles();

  useEffect(() => {
    if (props.isReady) {
      const animation = getAnimation();
      animation.play();
    }
  }, [props.isReady]);

  return (
    <Box
      className={classnames(Utils.getElClass('component', 'header'), classes.header)}
      component="header"
      id={Utils.getElId('site', 'header')}
    >
      <IconButton aria-label="go to homepage" href="/">
        <SiteLogo className={classes.siteLogo} id={Utils.getElId('site', 'logo')} size={20} />
      </IconButton>

      <Box className={classes.iconSet}>
        <IconButton aria-label="about this website" onClick={() => console.log('tbd')}>
          <InfoOutlinedIcon />
        </IconButton>
        <IconButton
          aria-label="visit github page"
          href={constants.links.github.url}
          target="_blank"
          title={constants.links.github.title}
        >
          <GitHubIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

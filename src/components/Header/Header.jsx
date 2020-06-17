import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import GitHubIcon from '@material-ui/icons/GitHub';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import { IconButton } from '../../components';
import { LINKS, ROUTES } from '../../const';
import * as Utils from '../../utils';
import SiteLogo from '../SiteLogo/SiteLogo';

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
    '& > *': { marginLeft: theme.spacing(1) / 2 },
  },
  siteLogo: {
    '&:hover path': {
      fill: theme.palette.grey[600],
      '&:nth-child(6), &:nth-child(7), &:nth-child(8)': {
        fill: theme.palette.primary.main,
      },
    },
    '& path': { fill: theme.palette.grey[800] },
  },
}));

export default (props) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box id={Utils.getElId('site', 'header')} className={classes.header} component="header">
      <IconButton aria-label="go to homepage" onClick={() => history.push(ROUTES.HOME)}>
        <SiteLogo id={Utils.getElId('site', 'logo')} className={classes.siteLogo} size={20} />
      </IconButton>

      <Box className={classes.iconSet}>
        <IconButton aria-label="about this website" onClick={() => history.push(ROUTES.PURPOSE)}>
          <InfoOutlinedIcon />
        </IconButton>
        <IconButton
          aria-label="visit github page"
          href={LINKS.GITHUB}
          target="_blank"
          title={'view source code'}
        >
          <GitHubIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import classnames from 'classnames';

import { BusinessCard, IconButton } from '../../components/';
import { useCopy } from '../../i18n';
import * as Utils from '../../utils';
import getAnimation from './anime';

const useStyles = makeStyles(({ palette, spacing, transitions, zIndex }) => ({
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    bottom: 0,
    left: 0,
    padding: spacing(1),
    width: '100%',
    color: palette.grey[800],
    opacity: 0,
    zIndex: zIndex.footer,
  },
}));

export default (props) => {
  const classes = useStyles();
  const { t } = useCopy();
  const [openBusinessCard, setOpenBusinessCard] = useState(false);

  useEffect(() => {
    if (props.isReady) {
      const animation = getAnimation();
      animation.play();
    }
  }, [props.isReady]);

  return (
    <>
      <Box
        className={classnames(Utils.getElClass('component', 'footer'), classes.footer)}
        component="footer"
        id={Utils.getElId('site', 'footer')}
      >
        <IconButton aria-label="show contact information" onClick={() => setOpenBusinessCard(true)}>
          <PermIdentityIcon />
        </IconButton>

        <Typography color="inherit" variant="caption">
          {t('components.Footer.copyright')}
        </Typography>
      </Box>
      <BusinessCard open={openBusinessCard} onCloseHandler={() => setOpenBusinessCard(false)} />
    </>
  );
};

import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import { IconButton } from '../../components/';
import { ROUTES } from '../../const';
import { useCopy } from '../../i18n';
import * as Utils from '../../utils';

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
  const history = useHistory();

  return (
    <>
      <Box id={Utils.getElId('site', 'footer')} className={classes.footer} component="footer">
        <IconButton
          aria-label="show contact information"
          onClick={() => history.push(ROUTES.BUSINESSCARD, { fromNav: true })}
        >
          <PermIdentityIcon />
        </IconButton>
        <Typography color="inherit" variant="caption">
          {t('components.Footer.copyright')}
        </Typography>
      </Box>
    </>
  );
};

import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import DomainIcon from '@material-ui/icons/Domain';
import classnames from 'classnames';

import SiteLogo from '../../components/SiteLogo/SiteLogo';
import { useCopy } from '../../i18n';
import { AppContext } from '../../store';
import * as Utils from '../../utils';

import PageLayout from '../PageLayout/PageLayout';

const useStyles = makeStyles(({ breakpoints, palette, spacing, zIndex }) => ({
  businessCardLayout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '10vh 10vw',
    padding: spacing(3),
    height: '100%',
    width: '100%',
    maxHeight: '80vh',
    maxWidth: '80vw',
    borderRadius: 0,
    borderTop: `.3125rem solid ${palette.primary.main}`,
    backgroundColor: palette.grey[1300],
    boxShadow: '0.125rem 0.375rem 0.5rem 0 rgba(0,0,0,.6)',
    [`${breakpoints.down('sm')} and (orientation: portrait)`]: {
      maxHeight: 500,
    },
    [`${breakpoints.up('md')} and (orientation: portrait)`]: {
      margin: '20vh auto',
      maxWidth: '30vh',
      maxHeight: '45vh',
    },
    [`${breakpoints.up('md')} and (orientation: landscape)`]: {
      margin: '15vh auto',
      maxWidth: '44vh',
      maxHeight: '66vh',
    },
  },
  logoTitleContainer: {
    [`${breakpoints.down('sm')} and (orientation: landscape)`]: {
      display: 'flex',
      alignItems: 'flex-end',
    },
  },
  contentContainer: {
    flex: 'none',
    marginTop: 'auto',
    padding: 0,
    [`${breakpoints.down('sm')} and (orientation: landscape)`]: {
      alignSelf: 'flex-end',
    },
  },
  siteLogo: {
    marginTop: spacing(1),
    marginBottom: spacing(2),
    '& path': {
      '&:nth-child(6),&:nth-child(7),&:nth-child(8)': {
        fill: palette.primary.main,
      },
    },
  },
  titleContainer: {
    marginTop: spacing(1),
    marginBottom: 'auto',
    padding: 0,
    [`${breakpoints.down('sm')} and (orientation: landscape)`]: {
      marginLeft: spacing(3),
      marginTop: spacing(2),
    },
  },
  title: {
    color: palette.primary.main,
    letterSpacing: '.05rem',
  },
  contentIcon: {
    paddingRight: spacing(1),
  },
  contentText: {
    display: 'flex',
    alignItems: 'center',
    color: palette.grey[300],
    letterSpacing: '.05rem',
    lineHeight: 1.65,
  },
  name: {
    color: palette.grey[300],
    textTransform: 'uppercase',
    letterSpacing: '0.2rem',
    lineHeight: 1.1,
  },
}));

export default (props) => {
  const classes = useStyles();
  const { t } = useCopy();

  return (
    <PageLayout pageName="business-card" className={classes.businessCardLayout} disableFullscreen>
      <Box className={classes.logoTitleContainer}>
        <SiteLogo className={classes.siteLogo} size={100} />
        <Box className={classes.titleContainer} disableTypography>
          <Typography className={classes.name} component="h2" variant="h2">
            {t('components.BusinessCard.name')}
          </Typography>
          <Typography className={classes.title} component="span" variant="body1">
            {t('components.BusinessCard.title')}
          </Typography>
        </Box>
      </Box>
      <Box className={classes.contentContainer}>
        <Link href={`tel:${t('components.BusinessCard.phoneNumber')}`}>
          <Typography className={classes.contentText} component="span" variant="body1">
            <CallIcon className={classes.contentIcon} />
            {t('components.BusinessCard.phoneNumber')}
          </Typography>
        </Link>
        <Link href={`mailto:${t('components.BusinessCard.emailAddress')}`}>
          <Typography className={classes.contentText} component="span" variant="body1">
            <EmailIcon className={classes.contentIcon} />
            {t('components.BusinessCard.emailAddress')}
          </Typography>
        </Link>
        <Typography className={classes.contentText} component="span" variant="body1">
          <DomainIcon className={classes.contentIcon} />
          {t('components.BusinessCard.companyName')}
        </Typography>
      </Box>
    </PageLayout>
  );
};

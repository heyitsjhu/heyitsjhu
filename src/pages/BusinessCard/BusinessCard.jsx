import React from 'react';
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
import * as Utils from '../../utils';

import PageLayout from '../PageLayout/PageLayout';

const useStyles = makeStyles(({ palette, spacing }) => ({
  businessCardLayout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '10vh auto',
    padding: spacing(3),
    minWidth: 384,
    maxWidth: '50vh',
    width: '100%',
    minHeight: 576,
    maxHeight: '75vh',
    height: '100%',
    borderRadius: 0,
    borderTop: `.3125rem solid ${palette.primary.main}`,
    backgroundColor: palette.grey[1300],
    boxShadow: '0.125rem 0.375rem 0.5rem 0 rgba(0,0,0,.6)',
  },
  contentContainer: {
    flex: 'none',
    marginTop: 'auto',
    padding: 0,
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
    margin: 0,
    color: palette.grey[300],
    fontSize: 32,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.3rem',
    lineHeight: 1.1,
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
  },
  title: {
    color: palette.primary.main,
    letterSpacing: '.05rem',
  },
}));

export default (props) => {
  const classes = useStyles();
  const { t } = useCopy();

  return (
    <PageLayout pageName="business-card" className={classes.businessCardLayout} disableFullscreen>
      <SiteLogo className={classes.siteLogo} size={100} />
      <Box
        id={Utils.getElId('component', 'business-card-title')}
        className={classnames(
          Utils.getElClass('element', 'businessCard-title'),
          classes.titleContainer
        )}
        disableTypography
      >
        <Typography className={classes.name} component="h2" variant="h3">
          {t('components.BusinessCard.name')}
        </Typography>
        <Typography className={classes.title} component="span" variant="body1">
          {t('components.BusinessCard.title')}
        </Typography>
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

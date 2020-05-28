import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Link from '@material-ui/core/Link';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import DomainIcon from '@material-ui/icons/Domain';
import classnames from 'classnames';

import { useCopy } from '../../i18n';
import SiteLogo from '../SiteLogo/SiteLogo';
import * as Utils from '../../utils';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(({ palette, spacing }) => ({
  businessCard: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: spacing(3),
    maxWidth: '50vh',
    width: '100%',
    maxHeight: '75vh',
    height: '100%',
    borderRadius: 0,
    borderTop: `.3125rem solid ${palette.primary.main}`,
    backgroundColor: palette.grey[900],
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
    color: palette.grey[500],
    letterSpacing: '.05rem',
    lineHeight: 1.65,
  },
  logo: {
    marginTop: spacing(1),
    marginBottom: spacing(2),
    '& path': {
      '&:nth-child(6),&:nth-child(7),&:nth-child(8)': {
        fill: palette.primary.main,
      },
    },
  },
  name: {
    margin: 0,
    fontSize: 32,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.3rem',
    lineHeight: 1.1,
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

export default ({ className, open, onCloseHandler, ...otherProps }) => {
  const { t } = useCopy();
  const classes = useStyles();
  const paperProps = { classes: { root: classes.businessCard } };

  return (
    <Dialog
      aria-labelledby={Utils.getElId('business-card-title')}
      className={Utils.getElClass('component', 'businessCard')}
      id={Utils.getElId('component', 'business-card')}
      open={open}
      PaperProps={paperProps}
      TransitionComponent={Transition}
      onClose={onCloseHandler}
      {...otherProps}
    >
      <SiteLogo className={classes.logo} size={120} />
      <DialogTitle
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
      </DialogTitle>
      <DialogContent className={classes.contentContainer}>
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
      </DialogContent>
    </Dialog>
  );
};

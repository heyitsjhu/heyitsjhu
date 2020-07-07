import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import MUIBreadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';

import * as Utils from '../../utils';

const useStyles = makeStyles(({ palette, spacing, transitions, typography, zIndex }) => ({
  breadcrumbs: {
    position: 'absolute',
    top: spacing(5),
    left: 13,
    opacity: 0,
    '& ol': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    '& .MuiBreadcrumbs-separator': { margin: 0 },
    zIndex: zIndex.breadcrumbs,
  },
  activeBreadcrumb: {
    backgroundColor: palette.grey[800],
  },
  breadcrumb: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },
  customBreadcrumb: {
    marginTop: spacing(1),
    marginBottom: spacing(1),
    height: 9,
    width: 9,
    borderRadius: '50%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: palette.grey[800],
    transition: `all ${transitions.duration.complex}ms ${transitions.easing.sharp}`,
    transitionDelay: `${transitions.duration.standard}ms`,
    zIndex: 1,
    '&:hover': {
      backgroundColor: palette.primary.dark,
      borderColor: palette.primary.dark,
      cursor: 'pointer',
      '& + div::before': {
        height: '100%',
        transitionDelay: '0ms',
      },
      '& ~ span': {
        left: spacing(4),
        color: palette.primary.dark,
        opacity: 1,
        transitionDelay: `${transitions.duration.shorter * 2}ms`,
        visibility: 'visible',
      },
    },
  },
  customSeparator: {
    position: 'relative',
    marginTop: spacing(1),
    marginBottom: spacing(1),
    height: spacing(4),
    width: 1,
    backgroundColor: palette.grey[800],
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '0%',
      backgroundColor: palette.primary.dark,
      transition: `all ${transitions.duration.complex}ms ${transitions.easing.easeIn}`,
      transitionDelay: `${transitions.duration.short * 2}ms`,
    },
  },
  linkText: {
    position: 'absolute',
    left: spacing(1),
    bottom: 6,
    color: palette.grey[800],
    fontWeight: typography.fontWeightMedium,
    letterSpacing: 1,
    lineHeight: 1,
    opacity: 0,
    transition: `all ${transitions.duration.complex}ms ${transitions.easing.easeInOut}`,
    zIndex: 0,
    visibility: 'hidden',
    whiteSpace: 'nowrap',
  },
}));

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

export default (props) => {
  const classes = useStyles();
  const location = useLocation();
  const urlSegments = location.pathname.split('/').filter((u) => u);

  return (
    <MUIBreadcrumbs
      id={Utils.getElId('site', 'breadcrumbs')}
      aria-label="breadcrumbs"
      className={classnames('dl-breadcrumbs', classes.breadcrumbs)}
      separator={null}
    >
      {urlSegments.map((urlSegment, i) => {
        const to = `/${urlSegments.slice(0, i + 1).join('/')}`;
        const active = i === urlSegments.length - 1;

        return (
          <Box key={to} className={classes.breadcrumb}>
            <LinkRouter
              className={classnames(
                Utils.getElClass('element', 'breadcrumb'),
                classes.customBreadcrumb,
                active && classes.activeBreadcrumb
              )}
              to={!active ? to : ''}
              onClick={handleClick}
            >
              <span />
            </LinkRouter>
            <Box
              className={classnames(
                Utils.getElClass('element', 'breadcrumb-separator'),
                classes.customSeparator
              )}
            />
            <Typography className={classes.linkText} variant="overline">
              {urlSegment.replace(/-/gi, ' ')}
            </Typography>
          </Box>
        );
      })}
    </MUIBreadcrumbs>
  );
};

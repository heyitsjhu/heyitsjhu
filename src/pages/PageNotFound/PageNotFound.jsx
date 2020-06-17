import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

import { ROUTES } from '../../const';
import { useCopy } from '../../i18n';
import PageLayout from '../PageLayout/PageLayout';

const useStyles = makeStyles(({ palette, spacing }) => ({
  notFoundLayout: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    margin: spacing(2),
  },
}));

export default (props) => {
  const { t } = useCopy();
  const classes = useStyles();
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    history.push(ROUTES.HOME);
  };

  return (
    <PageLayout pageName="notFound" className={classes.notFoundLayout}>
      <Typography color="textPrimary" variant="h6">
        {t('pages.pageNotFound.thisIsEmbarrassing')}
      </Typography>
      <Box className={classes.iconContainer}>
        <ReportProblemIcon color="primary" style={{ fontSize: 96 }} />
      </Box>
      <Typography color="textPrimary" variant="subtitle1">
        {t('pages.pageNotFound.theresNothingHere')}
      </Typography>
      <Link color="primary" href="#" onClick={handleClick}>
        {t('pages.pageNotFound.backHomeButton')}
      </Link>
    </PageLayout>
  );
};

import React from 'react';
import Typography from '@material-ui/core/Typography';

import PageLayout from '../PageLayout/PageLayout';

export default (props) => {
  return (
    <PageLayout pageName="notFound">
      <Typography color="textPrimary">NOT FOUND</Typography>
    </PageLayout>
  );
};

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PageLayout from '../PageLayout/PageLayout';

const useStyles = makeStyles((theme) => ({
  aboutContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 900,
    width: '100%',
  },
  text: {
    color: theme.palette.text.primary,
  },
}));

export default (props) => {
  const classes = useStyles();
  return (
    <PageLayout pageName="about">
      <Box className={classes.aboutContainer}>
        <Typography className={classes.text} variant="h1">
          About me breh
        </Typography>
        <Typography className={classes.text} variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas dapibus odio eget
          vulputate. Ut gravida orci eget tincidunt faucibus. Aenean tincidunt, metus ut tempor
          consequat, erat purus finibus tellus, molestie aliquet erat libero ut mi. Praesent in
          sapien urna. Cras consectetur velit eget nisl pharetra, sit amet posuere ante placerat.
          Aliquam viverra tortor diam, non tincidunt risus ultricies quis. Vestibulum elementum
          porttitor laoreet. Praesent non purus consequat, vestibulum urna sed, aliquet velit.
          Suspendisse dignissim turpis vel interdum finibus. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Vivamus euismod viverra dolor.
        </Typography>
        <Typography className={classes.text} variant="h2">
          About me breh
        </Typography>
        <Typography className={classes.text} variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas dapibus odio eget
          vulputate. Ut gravida orci eget tincidunt faucibus. Aenean tincidunt, metus ut tempor
          consequat, erat purus finibus tellus, molestie aliquet erat libero ut mi. Praesent in
          sapien urna. Cras consectetur velit eget nisl pharetra, sit amet posuere ante placerat.
          Aliquam viverra tortor diam, non tincidunt risus ultricies quis. Vestibulum elementum
          porttitor laoreet. Praesent non purus consequat, vestibulum urna sed, aliquet velit.
          Suspendisse dignissim turpis vel interdum finibus. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Vivamus euismod viverra dolor.
        </Typography>
        <Typography className={classes.text} variant="h3">
          About me breh
        </Typography>
        <Typography className={classes.text} variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer egestas dapibus odio eget
          vulputate. Ut gravida orci eget tincidunt faucibus. Aenean tincidunt, metus ut tempor
          consequat, erat purus finibus tellus, molestie aliquet erat libero ut mi. Praesent in
          sapien urna. Cras consectetur velit eget nisl pharetra, sit amet posuere ante placerat.
          Aliquam viverra tortor diam, non tincidunt risus ultricies quis. Vestibulum elementum
          porttitor laoreet. Praesent non purus consequat, vestibulum urna sed, aliquet velit.
          Suspendisse dignissim turpis vel interdum finibus. Vestibulum ante ipsum primis in
          faucibus orci luctus et ultrices posuere cubilia curae; Vivamus euismod viverra dolor.
        </Typography>
      </Box>
    </PageLayout>
  );
};

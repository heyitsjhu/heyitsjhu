import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import classnames from 'classnames';
import * as Utils from '../../utils';

const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  expansionPanel: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: palette.common.black,
    '&.MuiExpansionPanel-root.Mui-expanded:before': { opacity: 1 },
  },
  expansionPanelSummary: {
    paddingLeft: spacing(1) / 2,
    paddingRight: spacing(1) / 2,
    minHeight: 'initial',
    color: palette.grey[800],
    '&.Mui-expanded': {
      minHeight: 'initial',
      borderBottom: `1px solid rgba(255, 255, 255, 0.12)`,
    },
    '& .MuiExpansionPanelSummary-content': {
      justifyContent: 'flex-end',
      marginTop: spacing(1) / 2,
      marginBottom: spacing(1) / 2,
    },
    '& .MuiIconButton-root': {
      marginRight: 0,
      padding: 0,
      '& svg': {
        fill: palette.grey[800],
        transition: `fill ${transitions.duration.longer}ms ${transitions.easing.easeInOut}`,
      },
      '&:hover': {
        backgroundColor: 'transparent',
        '& svg': { fill: palette.grey[600] },
      },
    },
  },
  expansionPanelDetails: {
    padding: spacing(1),
  },
}));

export default (props) => {
  const classes = useStyles();

  return (
    <ExpansionPanel
      className={classnames([Utils.getElClass('chart', 'controls'), classes.expansionPanel])}
      square
    >
      <ExpansionPanelSummary
        aria-controls="panel1a-content"
        className={classes.expansionPanelSummary}
        expandIcon={<ExpandLessIcon />}
        IconButtonProps={{ disableFocusRipple: true, disableRipple: true }}
        id="panel1a-header"
      >
        <Typography variant="caption">Filters</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.expansionPanelDetails}>
        <Typography variant="caption">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

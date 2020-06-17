import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Typography from '@material-ui/core/Typography';

import LineChart from '../../components/Charts/LineChart/LineChart';
import MapChart from '../../components/Charts/MapChart/MapChart';
import MapControls from '../../components/Charts/MapChart/MapControls';
import Toggle from '../../components/Toggle/Toggle';
import { useCopy } from '../../i18n';
import { AppContext } from '../../store';
import { fetchCovidHistoryData, updateCoronavirusSettings } from '../../store/actions';

import PageLayout from '../PageLayout/PageLayout';

const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  coronavirusLayout: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
  },
  pageActions: {
    paddingRight: spacing(1) / 2,
  },
  publicIcon: {
    width: 20,
    height: 20,
  },
  toggleSwitch: {
    '& .MuiSwitch-switchBase': {
      color: palette.primary.main,
      '& + .MuiSwitch-track': {
        backgroundColor: palette.primary.main,
      },
    },
  },
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
    padding: 0,
    width: '100%',
    height: '70vh',
    overflowX: 'scroll',
    overflowY: 'hidden',
  },
}));

export default (props) => {
  const [appState, dispatch] = useContext(AppContext);
  const [selectedCountries, setSelectedCountries] = useState(
    appState.coronavirus.settings.selectedCountries
  );
  const [showMapChart, setShowMapChart] = useState(false);

  const classes = useStyles();
  const { t } = useCopy();

  const pageActions = () => {
    return (
      <Box className={classes.pageActions}>
        <Toggle
          checked={showMapChart}
          checkedLabel={t('pages.Coronavirus.Toggle.checkedLabel')}
          uncheckedLabel={t('pages.Coronavirus.Toggle.uncheckedLabel')}
          onChange={() => setShowMapChart(!showMapChart)}
        />
      </Box>
    );
  };

  const handleExpansionPanelChange = (event, expanded) => {
    if (!expanded) {
      dispatch(updateCoronavirusSettings('selectedCountries', selectedCountries));
      // need to check if settings have changed then call api
      // maybe filter newstate with current and only send difference to api
      fetchCovidHistoryData(appState.coronavirus.history, selectedCountries, dispatch);
    }
  };

  return (
    <PageLayout
      pageName="coronavirus"
      className={classes.coronavirusLayout}
      pageActions={pageActions()}
    >
      {showMapChart ? (
        <MapChart id="covid-map-chart" data={appState.coronavirus} />
      ) : (
        <LineChart id="covid-line-chart" data={appState.coronavirus} />
      )}

      <ExpansionPanel
        className={classes.expansionPanel}
        onChange={handleExpansionPanelChange}
        square
      >
        <ExpansionPanelSummary
          aria-controls="covid-expansion-panel-content"
          className={classes.expansionPanelSummary}
          expandIcon={<ExpandLessIcon />}
          IconButtonProps={{ disableFocusRipple: true, disableRipple: true }}
          id="covid-expansion-panel-header"
        >
          <Typography variant="caption">
            {t('components.Charts.MapChart.MapControls.controlPanel')}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
          <MapControls
            countriesList={appState.coronavirus.countries}
            selectedCountries={selectedCountries}
            setSelectedCountries={setSelectedCountries}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </PageLayout>
  );
};

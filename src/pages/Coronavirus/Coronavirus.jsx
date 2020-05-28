import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import classnames from 'classnames';

import CovidApi from '../../api/CovidApi';
import { Loading } from '../../components';
import { useCopy } from '../../i18n';
import PageLayout from '../PageLayout/PageLayout';
import MapChart from './MapChart';
import MapControls from './MapControls';
import CountrySelect from './CountrySelect';
import { AppContext, SET_CORONAVIRUS_DATA, SET_CORONAVIRUS_SETTING } from '../../store';
import * as Utils from '../../utils';
import logger from '../../utils/logger';

const useStyles = makeStyles((theme) => ({
  coronavirusLayout: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
  },
}));

const C19Api = new CovidApi();
const chartId = 'chart--coronavirus';

export default (props) => {
  const [appState, dispatch] = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const { t } = useCopy();

  const handleCountryCheckboxChange = (event) => {
    const country = event.currentTarget.name;
    const checked = event.currentTarget.checked;
    console.log('handleCountryCheckboxChange', country, checked);
    dispatch({ type: SET_CORONAVIRUS_SETTING, country, checked });
    // setState({ ...state, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    const { coronavirus } = appState;
    if (!coronavirus.loaded) {
      setLoading(true);

      Promise.all([C19Api.getListOfCountries(), C19Api.getHistory(), C19Api.getStatistics()]).then(
        (c19data) => {
          dispatch({ type: SET_CORONAVIRUS_DATA, payload: c19data });
          setLoading(false);
        }
      );
    }
  }, []);

  return (
    <PageLayout
      pageName="coronavirus"
      className={classnames(Utils.getElClass('page', 'coronavirus'), classes.coronavirusLayout)}
    >
      {/* <Loading isLoading={loading} /> */}
      <MapChart id={chartId} data={appState.coronavirus.data} />
      <MapControls />
    </PageLayout>
  );
};

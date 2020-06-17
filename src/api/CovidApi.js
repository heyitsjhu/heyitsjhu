import axios from 'axios';
import log from '../utils/logger';

const countriesBaseUrl = process.env.REACT_APP_RAPIDAPI_COVID_COUNTRY_URL;
const covidStatsBaseUrl = process.env.REACT_APP_RAPIDAPI_COVID_URL;

export default class CovidApi {
  constructor() {
    this.config = {
      baseURL: `https://${process.env.REACT_APP_RAPIDAPI_COVID_URL}`,
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_COVID_URL,
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
      },
    };
  }

  _fetch = async (baseUrl, endpoint, params = {}) => {
    this.config.baseURL = `https://${baseUrl}`;
    this.config.headers['x-rapidapi-host'] = baseUrl;

    const result = await axios
      .get(endpoint, { ...this.config, params })
      .then((resp) => {
        log.info(this.constructor.name, endpoint, params, resp);
        if (resp.status === 200) {
          if (resp.data.response) return resp.data.response;
          if (resp.data) return resp.data;
        }
      })
      .catch((error) => {
        log.error(this.constructor.name, endpoint, params, error);
        // TODO: should probably throw?
        return error;
      });

    return result;
  };

  // https://rapidapi.com/api-sports/api/covid-193
  getCountries = () => this._fetch(covidStatsBaseUrl, '/countries');
  getHistory = (country = 'all', day) =>
    this._fetch(covidStatsBaseUrl, '/history', { country, day });
  getStatistics = (country) => this._fetch(covidStatsBaseUrl, '/statistics', { country });

  // https://rapidapi.com/Gramzivi/api/covid-19-data
  getListOfCountries = () => this._fetch(countriesBaseUrl, '/help/countries');
}

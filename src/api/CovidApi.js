import axios from 'axios';
import log from '../utils/logger';

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

  _fetch = async (endpoint, params = {}) => {
    this.config.baseURL = `https://${process.env.REACT_APP_RAPIDAPI_COVID_URL}`;
    this.config.headers['x-rapidapi-host'] = process.env.REACT_APP_RAPIDAPI_COVID_URL;

    const result = await axios
      .get(endpoint, { ...this.config, params })
      .then((resp) => {
        log.info(this.constructor.name, endpoint, resp);

        if (!Array.isArray(resp.data.errors)) {
          log.error(this.constructor.name, endpoint, resp.data.errors);
        }

        if (resp.status === 200 && resp.data) return resp.data.response;
      })
      .catch((error) => {
        log.error(this.constructor.name, endpoint, error);
        return error;
      });

    return result;
  };

  _fetchCountries = async (endpoint, params = {}) => {
    this.config.baseURL = `https://${process.env.REACT_APP_RAPIDAPI_COVID_COUNTRY_URL}`;
    this.config.headers['x-rapidapi-host'] = process.env.REACT_APP_RAPIDAPI_COVID_COUNTRY_URL;

    const result = await axios
      .get(endpoint, { ...this.config, params })
      .then((resp) => {
        log.info(this.constructor.name, endpoint, resp);
        if (resp.status === 200 && resp.data) return resp.data;
      })
      .catch((error) => {
        log.error(this.constructor.name, endpoint, error);
        return error;
      });

    return result;
  };

  // https://rapidapi.com/api-sports/api/covid-193
  getHistory = (country = 'all', day) => this._fetch('/history', { country, day });
  getStatistics = (country) => this._fetch('/statistics', { country });

  // https://rapidapi.com/Gramzivi/api/covid-19-data
  getListOfCountries = () => this._fetchCountries('/help/countries');
}

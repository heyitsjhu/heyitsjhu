import { deepClone } from './deepClone';

export const COVID_CHART_DATA_LABELS = [
  { key: 'casesNew', label: 'New Cases' },
  { key: 'casesActive', label: 'Active Cases' },
  { key: 'casesCritical', label: 'Critical Cases' },
  { key: 'casesRecovered', label: 'Recovered Cases' },
  { key: 'casesTotal', label: 'Total Cases' },
  { key: 'deathsNew', label: 'New Deaths' },
  { key: 'deathsTotal', label: 'Total Deaths' },
  { key: 'testsTotal', label: 'Total Tests' },
];

// Given a historical state's key, returns an array containing
// the keys needed to retrieve the corresponding historical data.
const getDataMapping = (historicalKey) => {
  if (historicalKey.includes('1MPop')) {
    const match = /(1MPop)/.exec(historicalKey);
    const firstKey = historicalKey.slice(0, match.index);
    return [firstKey, '1M_pop'];
  } else if (historicalKey.includes('New')) {
    const match = /(New)/.exec(historicalKey);
    const firstKey = historicalKey.slice(0, match.index);
    return [firstKey, 'new'];
  } else if (historicalKey.includes('Active')) {
    const match = /(Active)/.exec(historicalKey);
    const firstKey = historicalKey.slice(0, match.index);
    return [firstKey, 'active'];
  } else if (historicalKey.includes('Critical')) {
    const match = /(Critical)/.exec(historicalKey);
    const firstKey = historicalKey.slice(0, match.index);
    return [firstKey, 'critical'];
  } else if (historicalKey.includes('Recovered')) {
    const match = /(Recovered)/.exec(historicalKey);
    const firstKey = historicalKey.slice(0, match.index);
    return [firstKey, 'recovered'];
  } else if (historicalKey.includes('Total')) {
    const match = /(Total)/.exec(historicalKey);
    const firstKey = historicalKey.slice(0, match.index);
    return [firstKey, 'total'];
  } else if (historicalKey === 'population') {
    return ['population'];
  } else {
    return [];
  }
};

// Returns an array of objects containing the historical state's key, and
// the dataMapping for that key in order to retrieve the data from the api.
const getHistoricalDataMappings = (historicalState) => {
  return Object.keys(historicalState).map((historicalKey) => {
    return { stateKey: historicalKey, dataMap: getDataMapping(historicalKey) };
  });
};

// Merges Covid-19 historical data for an array of countries into the
// reducer's coronavirus history object for amCharts ingestion. Also, pushes
// the country into a _retrievedCountries property for easier reference
export const convertCovidHistoricalData = (historicalState, countriesData) => {
  const newHistoryState = deepClone(historicalState);

  const historicalDataMapping = getHistoricalDataMappings(historicalState);

  countriesData.forEach((countryData) => {
    if (countryData.length > 0) {
      newHistoryState._retrievedCountries.push(countryData[0].country.toLowerCase());
    }

    countryData.reduce(getEndOfDayStatistic, []).forEach((dayStat) => {
      const country = dayStat.country.toLowerCase();
      const metadata = { day: dayStat.day, time: dayStat.time };

      historicalDataMapping.forEach(({ stateKey, dataMap }) => {
        const daysData = newHistoryState[stateKey].find(({ day }) => day === metadata.day);

        switch (dataMap.length) {
          case 2:
            daysData
              ? (daysData[country] = dayStat[dataMap[0]][dataMap[1]])
              : newHistoryState[stateKey].push({
                  ...metadata,
                  [country]: dayStat[dataMap[0]][dataMap[1]],
                });
            break;
          case 1:
            daysData
              ? (daysData[country] = dayStat[dataMap[0]])
              : newHistoryState[stateKey].push({ ...metadata, [country]: dayStat[dataMap[0]] });
            break;
          default:
            break;
        }
      });
    });
  });

  return newHistoryState;
};

// Given a country's historical data set, pushes the end of day, or latest, data for each day into, and returns, the accumulated array.
const getEndOfDayStatistic = (accItem, currItem) => {
  const hasEntry = accItem.find((item) => item.day === currItem.day);
  if (!accItem.length || !hasEntry) {
    accItem.push(currItem);
  }
  return accItem;
};

// Converts Covid-19 statistics data for amCharts ingestion.
export const convertCovidStatisticsData = (data) => {
  const replaceRegex = new RegExp(/-/, 'gi');

  return data.statistics
    .map(({ country, cases, deaths, tests, day, time }) => {
      const countryName = country.replace(replaceRegex, ' ');
      const countryData = data.countries.find((countryItem) => countryItem.name === countryName);

      return {
        id: countryData ? countryData.alpha2code : undefined,
        name: countryName,
        casesNew: cases.new,
        casesActive: cases.active,
        casesCritical: cases.critical,
        casesRecovered: cases.recovered,
        casesTotal: cases.total,
        deathsNew: deaths.new,
        deathsTotal: deaths.total,
        testsTotal: tests.total,
        day,
        time,
      };
    })
    .filter((dataItem) => typeof dataItem.id !== 'undefined');
};

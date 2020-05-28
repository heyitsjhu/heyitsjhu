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

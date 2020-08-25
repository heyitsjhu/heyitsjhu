export const getBackwardsDate = (dateNow, anchorDate) => {
  const dateDifference = anchorDate.getTime() - dateNow.getTime();
  const backwardsTimestamp = anchorDate.getTime() + dateDifference;
  return new Date(backwardsTimestamp);
};

export const getCountrySelectOptions = (countries) => {
  return countries.map((country) => ({
    value: country,
    label: country,
  }));
};

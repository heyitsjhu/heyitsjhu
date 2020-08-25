import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

import Clock from "../../components/Clock/Clock";
import WikiListSegment from "../../components/WikiListSegment/WikiListSegment";
import { CLOCK_TICK_INTERVAL } from "../../const";
import { getBackwardsDate } from "../../helpers";
import { useCopy } from "../../i18n";
import { AppContext, STORE_KEYS } from "../../store";
import { getWikipediaData, updateStore } from "../../store/actions";

import PageLayout from "../PageLayout/PageLayout";
import { getWikiPageData } from "./utils";

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  backwardsClockLayout: { overflow: "hidden" },
  backwardsClockContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  wikiContainer: {
    display: "flex",
    flexWrap: "nowrap",
    width: "100%",
    overflowY: "auto",
    [`${breakpoints.down("md")} and (orientation: portrait)`]: {
      flexDirection: "column",
    },
  },
  wikiSegment: {
    flex: 1,
    padding: `${spacing(4)}px ${spacing(2)}px`,
  },
  autocompleteInput: {
    padding: spacing(2),
    width: "100%",
    maxWidth: 200,
  },
}));

export default (props) => {
  const classes = useStyles();
  const { t } = useCopy();
  const [appState, dispatch] = useContext(AppContext);
  const { dateAnchor, dateBackwards, wikiData } = appState[
    STORE_KEYS.BACKWARDS_CLOCK
  ];
  const [selectedYear, setSelectedYear] = useState(null);
  const [pageData, setPageData] = useState(null);

  const handleOnInputChange = (event, newValue) => {
    if (newValue !== selectedYear) {
      setSelectedYear(newValue !== "" ? newValue : null);
    }
  };

  const dateTimeTicker = () => {
    const payload = getBackwardsDate(new Date(), dateAnchor);
    dispatch(updateStore(STORE_KEYS.BACKWARDS_CLOCK, "dateBackwards", payload));
  };

  const renderWikiSegments = (pageData) => {
    return Object.keys(pageData).map((dataType, i) => (
      <WikiListSegment
        dataType={dataType}
        data={pageData[dataType]}
        year={selectedYear}
        key={dataType + i}
      />
    ));
  };

  useEffect(() => {
    const year = dateBackwards.getYear();
    const month = dateBackwards.getMonth() + 1;
    const date = dateBackwards.getDate();

    getWikipediaData(month, date, year, dispatch);

    const interval = setInterval(dateTimeTicker, CLOCK_TICK_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const pageData = getWikiPageData(selectedYear, wikiData);
    setPageData(pageData);
  }, [selectedYear, wikiData]);

  return (
    <PageLayout
      className={classes.backwardsClockLayout}
      pageName="backwards-clock"
    >
      {wikiData && (
        <Box className={classes.backwardsClockContainer}>
          <Clock date={dateBackwards} timezone="America/Los_Angeles" />

          <Autocomplete
            id="backwards-clock-autocomplete-year-input"
            className={classes.autocompleteInput}
            options={wikiData.years}
            getOptionLabel={(option) => option}
            size="small"
            style={{ width: 300 }}
            onInputChange={handleOnInputChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("pages.BackwardsClock.Autocomplete.filterByYear")}
                variant="outlined"
              />
            )}
          />

          <Box className={classes.wikiContainer}>
            {pageData && renderWikiSegments(pageData)}
          </Box>
        </Box>
      )}
    </PageLayout>
  );
};

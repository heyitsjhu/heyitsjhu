import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import moment from "moment-timezone";

import { CLOCK_UPDATE_INTERVAL, DATE_FORMAT } from "../../const";

const useStyles = makeStyles(({ spacing }) => ({
  clockContainer: {
    padding: spacing(4),
  },
  linearProgress: {
    marginBottom: spacing(1) / 4,
    "& .MuiLinearProgress-bar": { transition: "none" },
  },
}));

export default (props) => {
  const classes = useStyles();
  const dateRef = useRef(props.date);
  const [hourProgress, setHourProgress] = useState(null);
  const [minProgress, setMinProgress] = useState(null);
  const [secsProgress, setSecsProgress] = useState(null);
  const date = moment(props.date, props.timezone).format(DATE_FORMAT);
  const time = moment(props.date, props.timezone).format("LTS");

  const renderTime = () => {
    const now = new Date(dateRef.current.getTime() - CLOCK_UPDATE_INTERVAL);
    var hrs = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    var mil = now.getMilliseconds();

    var smoothsec = sec + mil / 1000;
    var smoothmin = min + smoothsec / 60;
    var smoothhr = hrs + smoothmin / 60;

    const hourProg = (smoothhr / 24) * 100;
    const minProg = (smoothmin / 60) * 100;
    const secProg = (smoothsec / 60) * 100;

    dateRef.current = now;

    setHourProgress(hourProg);
    setMinProgress(minProg);
    setSecsProgress(secProg);
  };

  useEffect(() => {
    const interval = setInterval(renderTime, CLOCK_UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {props.date && (
        <Box className={classes.clockContainer}>
          <Typography variant="h6">{date}</Typography>
          <Typography variant="h2">{time}</Typography>

          <LinearProgress
            className={classes.linearProgress}
            variant="determinate"
            value={hourProgress}
          />
          <LinearProgress
            className={classes.linearProgress}
            variant="determinate"
            value={minProgress}
          />
          <LinearProgress
            className={classes.linearProgress}
            variant="determinate"
            value={secsProgress}
          />
        </Box>
      )}
    </>
  );
};

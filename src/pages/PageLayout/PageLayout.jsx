import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Fade from "@material-ui/core/Fade";
import classnames from "classnames";

import { PAGE_LAYOUT_FADE_TIMEOUT, ROUTES } from "../../const";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import * as Utils from "../../utils";

const useStyles = makeStyles(({ spacing, zIndex }) => ({
  pageLayout: {
    position: "relative",
    padding: spacing(4),
    minHeight: "100%",
    height: "100%",
    zIndex: zIndex.pageLayout,
  },
  pageActions: {
    display: "flex",
    position: "absolute",
    top: 0,
    right: 0,
    padding: spacing(1) / 2,
    zIndex: zIndex.pageLayoutPageActions,
  },
}));

export default ({
  children,
  className,
  pageActions,
  pageName,
  ...otherProps
}) => {
  const classes = useStyles();
  const history = useHistory();
  const layoutRef = useRef(null);
  const [fadeIn, setFadeIn] = useState(false);

  const handleClose = () => history.push(ROUTES.HOME);

  useOnClickOutside(layoutRef, useCallback(handleClose));

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <Box
      id={Utils.getElId("page", pageName)}
      className={classnames([classes.pageLayout, className])}
      ref={layoutRef}
    >
      <Box className={classes.pageActions}>{pageActions && pageActions}</Box>
      <Fade in={fadeIn} timeout={PAGE_LAYOUT_FADE_TIMEOUT}>
        <Box height="100%" {...otherProps}>
          {children}
        </Box>
      </Fade>
    </Box>
  );
};

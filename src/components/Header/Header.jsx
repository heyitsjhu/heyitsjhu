import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import AccountBoxRoundedIcon from "@material-ui/icons/AccountBoxRounded";
import InfoRoundedIcon from "@material-ui/icons/InfoRounded";
import { ROUTES } from "../../const";
import { useCopy } from "../../i18n";
import * as Utils from "../../utils";

import IconButton from "../IconButton/IconButton";
import PurposeCard from "../PurposeCard/PurposeCard";
import SiteLogo from "../SiteLogo/SiteLogo";

const useStyles = makeStyles(({ palette, shared, spacing, zIndex }) => ({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "fixed",
    top: 0,
    left: 0,
    padding: spacing(1),
    width: "100%",
    opacity: 0,
    zIndex: zIndex.header,
  },
  iconSet: {
    "& > *": { marginLeft: spacing(1) },
  },
}));

export default (props) => {
  const classes = useStyles();
  const { t } = useCopy();
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const openPurposeCard = () => {
    setOpen(true);
  };

  const closePurposeCard = () => {
    setOpen(false);
  };

  return (
    <Box
      id={Utils.getElId("site", "header")}
      className={classes.header}
      component="header"
    >
      <IconButton
        aria-label={t("a11y.ariaLabel.siteHomeUrl")}
        onClick={() => history.push(ROUTES.HOME)}
      >
        <SiteLogo id={Utils.getElId("site", "logo")} size={20} />
      </IconButton>

      {/* <Box className={classes.iconSet}>
        <IconButton
          aria-label={t("a11y.ariaLabel.siteAboutUrl")}
          // onClick={openPurposeCard}
        >
          <AccountBoxRoundedIcon fontSize="small" />
        </IconButton>
        <IconButton
          aria-label={t("a11y.ariaLabel.sitePurposeUrl")}
          onClick={openPurposeCard}
        >
          <InfoRoundedIcon fontSize="small" />
        </IconButton>
      </Box> */}
      <PurposeCard open={open} onClose={closePurposeCard} />
    </Box>
  );
};

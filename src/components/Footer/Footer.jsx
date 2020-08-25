import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import ContactMailRoundedIcon from "@material-ui/icons/ContactMailRounded";

import { LINKS } from "../../const";
import { useCopy } from "../../i18n";
import * as Utils from "../../utils";

import BusinessCard from "../BusinessCard/BusinessCard";
import IconButton from "../IconButton/IconButton";

const useStyles = makeStyles(({ palette, spacing, transitions, zIndex }) => ({
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "fixed",
    bottom: 0,
    left: 0,
    padding: spacing(1),
    width: "100%",
    color: palette.grey[800],
    opacity: 0,
    zIndex: zIndex.footer,
  },
  iconSet: {
    "& > *": { marginLeft: spacing(1) },
  },
}));

export default (props) => {
  const classes = useStyles();
  const { t } = useCopy();
  const [open, setOpen] = useState(false);

  const openBusinessCard = () => setOpen(true);
  const closeBusinessCard = () => setOpen(false);

  return (
    <>
      <Box
        id={Utils.getElId("site", "footer")}
        className={classes.footer}
        component="footer"
      >
        <IconButton
          aria-label="show contact information"
          onClick={openBusinessCard}
        >
          <ContactMailRoundedIcon fontSize="small" />
        </IconButton>

        <Typography color="inherit" variant="caption">
          {t("components.Footer.copyright")}
        </Typography>
        <Box className={classes.iconSet}>
          <IconButton
            aria-label={t("a11y.ariaLabel.siteGithubUrl")}
            href={LINKS.GITHUB}
            target="_blank"
          >
            <CodeRoundedIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <BusinessCard open={open} onClose={closeBusinessCard} />
    </>
  );
};

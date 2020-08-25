import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";

import { useCopy } from "../../i18n";

const useStyles = makeStyles(({ palette, shared, spacing, zIndex }) => ({
  purposeCardLayout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    margin: "10vh 15vw",
    padding: spacing(3),
    minHeight: 200,
    minWidth: 300,
    maxHeight: "80vh",
    maxWidth: "80vw",
    backgroundColor: palette.grey[1300],
    borderRadius: 0,
    border: shared.borderDefault,
    boxShadow: "0.125rem 0.375rem 0.5rem 0 rgba(0,0,0,0.6)",
    outline: "none",
    zIndex: zIndex.purposeCard,
    "& > *": {
      color: palette.text.primary,
    },
  },
  backdrop: {
    backgroundColor: "rgba(0,0,0,0.75)",
  },
}));

export default (props) => {
  const classes = useStyles();
  const { t } = useCopy();

  const closePurposeCard = () => {
    props.onClose();
  };

  return (
    <Modal
      // need to associate with content in purpose card
      aria-labelledby="purpose-card-modal-title"
      aria-describedby="purpose-card-modal-description"
      open={props.open}
      onClose={closePurposeCard}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        className: classes.backdrop,
      }}
    >
      <Fade in={props.open}>
        <Box className={classes.purposeCardLayout}>
          <Typography component="h4" variant="h4">
            {t("components.BusinessCard.name")}
          </Typography>
          <Typography component="p" variant="body1">
            {t("components.BusinessCard.name")}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

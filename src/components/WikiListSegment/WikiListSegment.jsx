import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import stringReplace from "react-string-replace";

import { useCopy } from "../../i18n";

const useStyles = makeStyles(({ spacing }) => ({
  wikiSegment: {
    flex: 1,
    padding: `${spacing(4)}px ${spacing(2)}px`,
  },
  wikiListItem: {
    display: "block",
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

const wrapContentWithUrl = (wikipedia) => (match) => {
  return (
    <Link key={match} href={wikipedia} target="_blank">
      {match}
    </Link>
  );
};

const renderTextContent = (dataItem) => {
  const { title, wikipedia } = dataItem.wikipedia[0];
  const urlizedContent = stringReplace(
    `${dataItem.year} - ${dataItem.description}`,
    title,
    wrapContentWithUrl(wikipedia)
  );
  return urlizedContent;
};

export default ({ data, dataType, year }) => {
  const classes = useStyles();
  const { t } = useCopy();
  const title = t(`components.WikiSegment.title`, { dataType, year });

  return (
    <Box className={classnames([classes.wikiSegment])}>
      <Typography variant="h6">
        {title}
        {!year && t("components.WikiSegment.mostRecent")}
      </Typography>
      <List aria-label={`list of ${dataType} in ${year}`}>
        {data.length ? (
          data.map((dataItem) => {
            return (
              <ListItem
                className={classes.wikiListItem}
                key={dataItem.description}
              >
                {renderTextContent(dataItem)}
              </ListItem>
            );
          })
        ) : (
          <ListItem className={classes.wikiListItem}>
            {t("components.WikiSegment.noData")}
          </ListItem>
        )}
      </List>
    </Box>
  );
};

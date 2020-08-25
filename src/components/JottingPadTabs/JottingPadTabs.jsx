import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import { STORE_KEYS } from "../../const";
import { AppContext } from "../../store";
import { updateStore } from "../../store/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  hideTabIndicators: {
    display: "none",
  },
}));

const a11yProps = (tabLabel) => {
  return {
    id: `jotting-pad-tab-${tabLabel}`,
    // "aria-controls": `simple-tabpanel-${tabLabel}`,
  };
};

// const TabPanel = (props) => {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// };

export default (props) => {
  const classes = useStyles();
  const [_, dispatch] = useContext(AppContext);
  const [currentTab, setCurrentTab] = useState(props.activeTab);

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
    dispatch(updateStore(STORE_KEYS.JOTTING_PAD, "activeTag", newValue));
  };

  return (
    <>
      <Tabs
        aria-label="Filter options for jotting pad's category tags"
        value={currentTab}
        indicatorColor="primary"
        // variant="scrollable"
        centered
        textColor="primary"
        TabIndicatorProps={{ className: classes.hideTabIndicators }}
        onChange={handleChange}
      >
        {props.tabOptions.map((tabOption, i) => (
          <Tab
            key={tabOption}
            label={tabOption}
            value={tabOption}
            {...a11yProps(tabOption)}
          />
        ))}
      </Tabs>
    </>
  );
};

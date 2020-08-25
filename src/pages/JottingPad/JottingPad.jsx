import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import JottingPadHero from "../../components/JottingPadHero/JottingPadHero";
import JottingPadTabs from "../../components/JottingPadTabs/JottingPadTabs";
import JottingPadExcerpt from "../../components/JottingPadExcerpt/JottingPadExcerpt";
import { useCopy } from "../../i18n";
import { AppContext, STORE_KEYS } from "../../store";
import * as PostUtils from "../../utils/postHelpers";
import PageLayout from "../PageLayout/PageLayout";

const useStyles = makeStyles(({ breakpoints, palette, spacing }) => ({
  jottingPadLayout: { padding: 0 },
  excerptsContainer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    margin: "0 auto",
    padding: spacing(4),
    maxWidth: breakpoints.values.lg,
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: spacing(4),
    paddingTop: spacing(2),
    borderTop: `1px solid ${palette.grey[800]}`,
    width: "100%",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    color: palette.text.primary,
  },

  button: { fontSize: 14, textTransform: "uppercase" },
  prev: { alignItems: "flex-start" },
  next: { alignItems: "flex-end" },
}));

const getFilteredPosts = (posts, activeTag) => {
  return posts.filter((post) => {
    const postTags = PostUtils.getPostTags(post);
    return postTags.value.includes(activeTag);
  });
};

export default (props) => {
  const [appState] = useContext(AppContext);
  const { t } = useCopy();
  const classes = useStyles();
  const [posts, setPosts] = useState(appState[STORE_KEYS.JOTTING_PAD].posts);

  useEffect(() => {
    const { activeTag, posts } = appState[STORE_KEYS.JOTTING_PAD];
    const filteredPosts =
      activeTag === "all" ? posts : getFilteredPosts(posts, activeTag);

    setPosts(filteredPosts);
  }, [appState[STORE_KEYS.JOTTING_PAD].activeTag]);

  return (
    <PageLayout pageName="jottingPad" className={classes.jottingPadLayout}>
      <JottingPadHero />
      <Box className={classes.excerptsContainer}>
        <Typography>
          My mind often travels at a million miles per second. There's never
          really a shortage of thoughts going on up there. Writing them down
          though is a different story. And while I've set this section aside to
          encourage myself to do so, as you can see, it's still very much a work
          in progress. So, stay tuned...
        </Typography>
      </Box>

      {/* <JottingPadTabs
        activeTab={appState[STORE_KEYS.JOTTING_PAD].activeTag}
        tabOptions={appState[STORE_KEYS.JOTTING_PAD].tags}
      />
      <Box className={classes.excerptsContainer} component="ul">
        {posts.map((post, i) => (
          <JottingPadExcerpt
            key={i}
            post={post}
            component="li"
            reverseLayout={i % 2 !== 0}
          />
        ))}
      </Box> */}
    </PageLayout>
  );
};

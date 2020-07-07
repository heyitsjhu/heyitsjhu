import React, { useContext, useEffect, useReducer, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, ButtonBase, Typography } from '@material-ui/core';
import classnames from 'classnames';

import { PostExcerpt } from '../../components';
import { ROUTES } from '../../const';
import { useEventListener } from '../../hooks/useEventListener';
import { useCopy } from '../../i18n';
import { AppContext } from '../../store';
import PageLayout from '../PageLayout/PageLayout';
import { initialState, stateReducer } from './utils';

const useStyles = makeStyles(({ palette, spacing }) => ({
  jottingPadLayout: {},
  masonryContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: 0,
    paddingLeft: 0,
  },
  paginationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: spacing(4),
    paddingTop: spacing(2),
    borderTop: `1px solid ${palette.grey[800]}`,
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    color: palette.text.primary,
  },

  button: { fontSize: 14, textTransform: 'uppercase' },
  prev: { alignItems: 'flex-start' },
  next: { alignItems: 'flex-end' },
}));

export default (props) => {
  const [appState, dispatch] = useContext(AppContext);
  const { t } = useCopy();
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [state, dispatchState] = useReducer(stateReducer, appState.jottingPad);

  // const { index, postContent } = state;

  const stateHandler = (key) => dispatchState({ key });

  const handleClick = (key) => {
    // push to history
    stateHandler(key);
  };

  const handleExcerptClick = (postPart) => {
    if (postPart) {
      const slug = postPart.value;
      history.push(`${ROUTES.JOTTINGPAD}/${slug}`);
    }
  };

  console.log('JottingPad', state, location);

  return (
    <PageLayout pageName="jottingPad" className={classes.jottingPadLayout}>
      <Box
        className={classes.masonryContainer}
        component={'ul'}
        // options={{ columnWidth: 200 }}
        // disableImagesLoaded={false}
        // updateOnEachImageLoad={false}
        // imagesLoadedOptions={imagesLoadedOptions}
      >
        {state.posts.map((post, i) => (
          <PostExcerpt post={post} onExcerptClick={handleExcerptClick} />
        ))}
      </Box>
    </PageLayout>
  );
};

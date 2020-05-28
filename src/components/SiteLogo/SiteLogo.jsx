import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import paths from './paths';

const useStyles = makeStyles((theme) => ({
  svgGroup: {
    stroke: 'none',
    strokeWidth: '1',
    fillRule: 'evenodd',
  },
  svgPath: {
    fill: theme.palette.grey[100],
    transition: `fill ${theme.transitions.duration.longer}ms ${theme.transitions.easing.easeInOut}`,
  },
}));

export default ({ className, size, ...otherProps }) => {
  const classes = useStyles();
  const viewBox = '0 0 528 566';

  return (
    <svg
      className={classnames(['DLComp-siteLogo-svg', className])}
      width={size}
      height={size * 1.071969}
      viewBox={viewBox}
      {...otherProps}
    >
      <g className={classes.svgGroup}>
        {paths.map((path, index) => (
          <path
            className={classnames([
              classes.svgPath,
              path.css && classes[path.css],
              path.className === 'set1' && 'DLComp-siteLogo-path-set1',
              path.className === 'set2' && 'DLComp-siteLogo-path-set2',
            ])}
            d={path.d}
            key={path.d}
          />
        ))}
      </g>
    </svg>
  );
};

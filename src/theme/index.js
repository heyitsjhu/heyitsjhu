import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

import palette from './palette';
import transitions from './transitions';
import typography from './typography';
import zIndex from './zIndex';

export default responsiveFontSizes(
  createMuiTheme({
    palette,
    transitions,
    typography,
    zIndex,
  })
);

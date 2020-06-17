import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import classnames from 'classnames';

import { useCopy } from '../../i18n';
import * as Utils from '../../utils';
import logger from '../../utils/logger';

const useStyles = makeStyles((theme) => ({
  countrySelect: {
    flexWrap: 'nowrap',
    height: '100%',
    maxHeight: 400,
    overflowY: 'scroll',

    '& .MuiIconButton-root': {
      padding: `2px ${theme.spacing(1)}px`,
    },
  },
  formControlLabel: {
    color: theme.palette.text.primary,
  },
}));

export default ({ countries, countryStates, onChange }) => {
  const classes = useStyles();
  const { t } = useCopy();

  const handleChange = (event) => {
    onChange && onChange(event);
  };

  return (
    <form>
      <FormGroup
        className={classnames(
          Utils.getElClass('component', 'country-select'),
          classes.countrySelect
        )}
        column
      >
        <FormLabel component="legend">
          <Typography color="textPrimary">
            {t('pages.Coronavirus.FormGroup.CountrySelect.Label')}
          </Typography>
        </FormLabel>
        {countries.map((country) => {
          return (
            <FormControlLabel
              className={classes.formControlLabel}
              control={
                <Checkbox
                  checked={countryStates[country]}
                  color="primary"
                  id={country}
                  inputProps={{ 'aria-label': country }}
                  name={country}
                  value={countryStates[country] || false}
                  onChange={handleChange}
                />
              }
              label={country}
              key={country}
            />
          );
        })}
      </FormGroup>
    </form>
  );
};

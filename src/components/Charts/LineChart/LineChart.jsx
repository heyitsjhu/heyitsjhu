import React, { useEffect, useRef, useState } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import classnames from 'classnames';
import { Loading } from '../../../components';
import palette from '../../../theme/palette';
import CHART_DATA_TYPES from './options/chartDataType.json';

am4core.useTheme(am4themes_animated);

const LABEL_FONT_SIZE = 12;
const LABEL_COLOR = palette.grey[400];
const LINE_COLOR = palette.grey[800];

const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  covidLineChartContainer: {
    marginTop: spacing(3),
    marginBottom: spacing(4),
  },
  radioGroup: {
    position: 'absolute',
    bottom: spacing(4),
    right: 0,
    flexDirection: 'row',
  },
  controlLabel: {
    color: LINE_COLOR,
    '& .MuiTypography-body1': { fontSize: LABEL_FONT_SIZE },
  },
  radioButton: {
    padding: spacing(1) / 2,
    color: LINE_COLOR,
  },
}));

export default (props) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [dataType, setDataType] = useState(CHART_DATA_TYPES[4]);
  const [chartData, setChartData] = useState([]);
  const chart = useRef({});

  useEffect(() => {
    if (props.data) {
      setIsLoading(true);
      setChartData(props.data.history);
    }
  }, [props.data]);

  const setDateAxis = (chart) => {
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.baseInterval = { timeUnit: 'day', count: 1 };
    dateAxis.renderer.labels.template.fill = am4core.color(LINE_COLOR);
    dateAxis.renderer.labels.template.fontSize = LABEL_FONT_SIZE;
    dateAxis.renderer.line.stroke = am4core.color(LINE_COLOR);
    dateAxis.renderer.line.strokeOpacity = 1;
    dateAxis.startLocation = 0.5;
    dateAxis.endLocation = 0.5;

    const dateTooltip = dateAxis.tooltip;
    dateTooltip.background.fill = am4core.color(LINE_COLOR);
    dateTooltip.background.strokeWidth = 0;
    dateTooltip.background.cornerRadius = 0;
    dateTooltip.background.pointerLength = 5;
    dateTooltip.label.fill = am4core.color(LABEL_COLOR);
    dateTooltip.label.fontSize = LABEL_FONT_SIZE;
  };

  const setValueAxis = (chart) => {
    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.renderer.labels.template.fill = am4core.color(LINE_COLOR);
    valueAxis.renderer.labels.template.fontSize = LABEL_FONT_SIZE;
    valueAxis.renderer.line.stroke = am4core.color(LINE_COLOR);
    valueAxis.renderer.line.strokeOpacity = 1;

    const valueTooltip = valueAxis.tooltip;
    valueTooltip.background.fill = am4core.color(LINE_COLOR);
    valueTooltip.background.strokeWidth = 0;
    valueTooltip.background.cornerRadius = 0;
    valueTooltip.background.pointerLength = 5;
    valueTooltip.label.fill = am4core.color(LABEL_COLOR);
    valueTooltip.label.fontSize = LABEL_FONT_SIZE;
  };

  const setLineSeries = (chart, country) => {
    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = 'day';
    series.dataFields.valueY = country;
    series.name = country;
    series.tooltipText = '[B]{name}[/B]: {valueY}';
    series.tooltip.pointerOrientation = 'vertical';
  };

  const setLegend = (chart) => {
    chart.legend = new am4charts.Legend();
    chart.legend.position = 'left';
    chart.legend.valign = 'top';
    chart.legend.dy = -25;
    chart.legend.scrollable = true;
    chart.legend.itemContainers.template.paddingTop = 2;
    chart.legend.itemContainers.template.paddingBottom = 2;
    chart.legend.labels.template.fill = am4core.color(LINE_COLOR);
    chart.legend.labels.template.fontSize = LABEL_FONT_SIZE;
  };

  const setChartCursor = (chart) => {
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.stroke = am4core.color(LINE_COLOR);
    chart.cursor.lineX.strokeOpacity = 1;
    chart.cursor.lineX.strokeDasharray = '5,5';

    chart.cursor.lineY.stroke = am4core.color(LINE_COLOR);
    chart.cursor.lineY.strokeOpacity = 1;
    chart.cursor.lineY.strokeDasharray = '5,5';
  };

  const handleRadioClick = (event) => {
    const chartType = CHART_DATA_TYPES.find(({ value }) => event.target.value === value);
    setDataType(chartType);
  };

  useEffect(() => {
    const { selectedCountries } = props.data.settings;
    chart.current = am4core.create(props.id, am4charts.XYChart);
    chart.current.paddingRight = 16;
    chart.current.paddingBottom = 32;
    chart.current.data = chartData[dataType.value];
    chart.current.events.on('ready', () => setIsLoading(false));
    chart.current.series.clear();

    // console.log('chartData', chartData[dataType.value]);

    setDateAxis(chart.current);
    setValueAxis(chart.current);

    selectedCountries.forEach((country) => {
      setLineSeries(chart.current, country);
    });

    setLegend(chart.current);
    setChartCursor(chart.current);

    return () => chart.current && chart.current.dispose();
  }, [props.id, chartData, dataType]);

  console.log('CHART', props, chartData);

  return (
    <>
      <Loading isLoading={props.data.loading} />
      <Box
        id={props.id}
        className={classnames(classes.covidLineChartContainer)}
        style={{ width: '100%', height: '100%' }}
      />

      <RadioGroup
        aria-label="chart data type"
        className={classes.radioGroup}
        name="dataType"
        value={dataType.value}
        onChange={handleRadioClick}
      >
        {CHART_DATA_TYPES.map(({ label, value }) => {
          return (
            <FormControlLabel
              key={label}
              className={classes.controlLabel}
              value={value}
              control={
                <Radio
                  className={classes.radioButton}
                  color="primary"
                  name={label}
                  size="small"
                  disableRipple
                />
              }
              label={label}
            />
          );
        })}
      </RadioGroup>
    </>
  );
};

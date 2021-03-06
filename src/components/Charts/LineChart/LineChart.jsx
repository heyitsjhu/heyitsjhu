import React, { useEffect, useRef, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import classnames from "classnames";
import { Loading } from "../../../components";
import { BIG_NUMBER_PREFIXES } from "../../../const";
import palette from "../../../theme/palette";

am4core.useTheme(am4themes_animated);

const PRIMARY_COLOR = palette.primary.main;
const LABEL_FONT_SIZE = 13;
const LABEL_COLOR = palette.grey[400];
const LINE_COLOR = palette.grey[800];

const useStyles = makeStyles(({ palette, spacing, transitions }) => ({
  covidLineChartContainer: {
    marginTop: spacing(3),
    marginBottom: spacing(4),
    width: "100%",
    height: `calc(100% - ${spacing(7)}px)`,
  },
}));

export default (props) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const { chartMetric } = props.data.controlPanel;
  const chart = useRef({});

  const setDateAxis = (chart) => {
    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.baseInterval = { timeUnit: "day", count: 1 };
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
    valueTooltip.numberFormatter.numberFormat = "#.#a";
  };

  const setLineSeries = (chart, country) => {
    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "day";
    series.dataFields.valueY = country;
    series.name = country;
    series.tooltipText = "[B]{name}[/B]: {valueY}";
    series.tooltip.pointerOrientation = "vertical";
  };

  const setLegend = (chart) => {
    chart.legend = new am4charts.Legend();
    chart.legend.parent = chart.plotContainer;
    chart.legend.position = "left";
    chart.legend.valign = "top";
    chart.legend.dy = -16;
    chart.legend.maxHeight = am4core.percent(40);
    chart.legend.scrollable = true;
    chart.legend.itemContainers.template.paddingTop = 2;
    chart.legend.itemContainers.template.paddingBottom = 2;
    chart.legend.labels.template.fill = am4core.color(LINE_COLOR);
    chart.legend.labels.template.fontSize = LABEL_FONT_SIZE;

    return chart.legend;
  };

  const setXYCursor = (chart) => {
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "zoomXY";

    chart.cursor.lineX.stroke = am4core.color(LINE_COLOR);
    chart.cursor.lineX.strokeOpacity = 1;
    chart.cursor.lineX.strokeDasharray = "5,5";

    chart.cursor.lineY.stroke = am4core.color(LINE_COLOR);
    chart.cursor.lineY.strokeOpacity = 1;
    chart.cursor.lineY.strokeDasharray = "5,5";

    return chart.cursor;
  };

  const setScrollbarX = (chart) => {
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.strokeWidth = 0;
    chart.scrollbarX.background.fill = am4core.color(LINE_COLOR);
    chart.scrollbarX.background.fillOpacity = 0.4;

    chart.scrollbarX.thumb.background.fill = am4core.color(LINE_COLOR);
    chart.scrollbarX.thumb.background.fillOpacity = 1;

    customizeScrollbarGrip(chart.scrollbarX.startGrip);
    customizeScrollbarGrip(chart.scrollbarX.endGrip);

    return chart.scrollbarX;
  };

  const setScrollbarY = (chart) => {
    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.strokeWidth = 0;
    chart.scrollbarY.background.fill = am4core.color(LINE_COLOR);
    chart.scrollbarY.background.fillOpacity = 0.4;

    chart.scrollbarY.thumb.background.fill = am4core.color(LINE_COLOR);
    chart.scrollbarY.thumb.background.fillOpacity = 1;

    customizeScrollbarGrip(chart.scrollbarY.startGrip);
    customizeScrollbarGrip(chart.scrollbarY.endGrip);

    return chart.scrollbarY;
  };

  const setZoomOutButton = (chart) => {
    chart.zoomOutButton.background.cornerRadius(4, 4, 4, 4);
    chart.zoomOutButton.background.fill = am4core.color(LINE_COLOR);
    chart.zoomOutButton.background.fillOpacity = 1;
    chart.zoomOutButton.cursorOverStyle = am4core.MouseCursorStyle.pointer;
    const hoverState = chart.zoomOutButton.background.states.getKey("hover");
    hoverState.properties.fill = am4core.color(PRIMARY_COLOR);
  };

  const customizeScrollbarGrip = (grip) => {
    grip.icon.disabled = true;
    grip.background.fill = am4core.color(LABEL_COLOR);
    grip.background.fillOpacity = 1;
  };

  useEffect(() => {
    chart.current = am4core.create(props.id, am4charts.XYChart);
    chart.current.paddingTop = 4;
    chart.current.paddingLeft = 4;
    chart.current.paddingRight = 4;
    chart.current.paddingBottom = 4;
    chart.current.numberFormatter.numberFormat = "#,###a";
    chart.current.numberFormatter.bigNumberPrefixes = BIG_NUMBER_PREFIXES;

    // chart.current.events.on('ready', () => setIsLoading(false));

    // console.log('chartData', chartData[dataType.value]);

    setChartData(props.data.history);
    setDateAxis(chart.current);
    setValueAxis(chart.current);

    setLegend(chart.current);
    setXYCursor(chart.current);
    setScrollbarX(chart.current);
    setScrollbarY(chart.current);
    setZoomOutButton(chart.current);

    return () => chart.current && chart.current.dispose();
  }, []);

  useEffect(() => {
    if (props.data && !chart.current.data.length) {
      chart.current.data = props.data.history[chartMetric].reverse();

      // console.log(
      //   "incoming new data, should update current data",
      //   props.data,
      //   chart.current.data
      // );
    } else {
      am4core.array.each(chart.current.data, (dataRow, i) => {
        // console.log("Data Row " + i, dataRow);
      });

      // setIsLoading(true);
    }
  }, [props.data.history]);

  useEffect(() => {
    const { selectedCountries } = props.data.controlPanel;

    chart.current.series.clear();

    selectedCountries.forEach((country) => {
      setLineSeries(chart.current, country);
    });
  }, [props.id, chartData]);

  useEffect(() => {
    // console.log("chart data changed", chartData);
  }, [chartData]);

  // console.log("CHART", props, chartData);

  return (
    <>
      <Loading isLoading={props.data.loading} />
      <Box
        id={props.id}
        className={classnames(classes.covidLineChartContainer)}
      />
    </>
  );
};

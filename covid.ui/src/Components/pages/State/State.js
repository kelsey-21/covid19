import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

import CovidData from '../../../helpers/data/CovidData';


class State extends React.Component {
  state = {
    coviddata: [],
    policydata: [],
  }

  componentDidMount() {
    this.GetStateData()
  }

  GetStateData = () => {
    // console.log('option 1', this.props.match.params.locationCode);
    const { locationCode } = this.props.match.params;
    CovidData.getStateData(locationCode)
    .then(data => {
      if (data !== undefined) {
        this.setState({ coviddata: data.covid, policydata: data.policy });
        this.CreateChart()
      }
    });
  };

  componentDidUpdate(prevState) {
    if (this.state.statedata !== prevState.statedata) {
      const { policydata, coviddata } = this.state;
      this.chart.data = coviddata;
    }
  }

  CreateChart() {

    let chart = am4core.create("chartdiv", am4charts.XYChart);
      if (this.state.coviddata) {
        chart.data = this.state.coviddata;
      }

    // chart.data = [
    //   {
    //       "date": "2020-07-23",
    //       "positive": 501
    //     },
    //     {
    //       "date": "2020-07-22",
    //       "positive": 301
    //     },
    // ];

        // series2.data = [
    //   {
    //       "date": "2020-07-23",
    //       "policy": "test"
    //     },
    //     {
    //       "date": "2020-07-22",
    //       "policy": "test2"
    //     },
    // ];

    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "positive";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}"
    series.strokeWidth = 2;
    series.minBulletDistance = 5;

    // Drop-shaped tooltips
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";

    // Make bullets grow on hover
    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color("#fff");

    var bullethover = bullet.states.create("hover");
    bullethover.properties.scale = 1.3;

    // Make a panning cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panXY";
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;

    // Create vertical scrollbar and place it before the value axis
    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.parent = chart.leftAxesContainer;
    chart.scrollbarY.toBack();

    // Create a horizontal scrollbar with previe and place it underneath the date axis
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);
    chart.scrollbarX.parent = chart.bottomAxesContainer;

    dateAxis.start = 0.79;
    dateAxis.keepSelection = true;

    return () => {
      chart.dispose();
    };
  }

  render() {

    return (
      <div className="State">
        <h3>COVID19 and Policy Tracking</h3>
        <div id="chartdiv" style={{ width: "90%", height: "400px" }}></div>
      </div>
    );
  }
}

export default State;

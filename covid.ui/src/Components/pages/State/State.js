import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

import CovidData from '../../../helpers/data/CovidData';

class State extends React.Component {
  state = {
    statedata: []
  }

  componentDidMount() {
    this.GetStateData()

    let chart = am4core.create("chartdiv", am4charts.XYChart);
    let xAxis = chart.xAxes.push(new am4charts.DateAxis());
    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    let secondyAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    secondyAxis.dataFields.category = "PolicyCode";

    xAxis.dateFormatter = new am4core.DateFormatter();
    xAxis.dateFormatter.dateFormat = "MM-dd";

    chart.dateFormatter.numberFormat = "#,### a"

    // Axis titles
    xAxis.title.text = "Time (in days)";
    yAxis.title.text = "Positive COVID cases and Policies";
    secondyAxis.title.text = "??";

    this.chart = chart;


    return () => {
      chart.dispose();
    };
  }

  GetStateData = () => {
    // console.log('option 1', this.props.match.params.locationCode);
    const { locationCode } = this.props.match.params;
    CovidData.getStateData(locationCode)
    .then(statedata => {
      if (statedata !== undefined) {
        this.setState({ statedata: statedata });
      }
    });
  };

  componentDidUpdate(prevState) {
    if (this.state.statedata !== prevState.statedata) {
      const { statedata } = this.state;
          // series
    let series1 = this.chart.series.push(new am4charts.LineSeries());
    series1.name = "Covid";
    series1.stroke = am4core.color("#CDA2AB");
    series1.strokeWidth = 3;
    series1.dataFields.valueY = "positive";
    series1.dataFields.categoryX = "date";

    let series2 = this.chart.series.push(new am4charts.LineSeries());
    series2.name = "Policy";
    series2.stroke = am4core.color("#444");
    series2.strokeWidth = 3;
    series2.dataFields.valueY = "PolicyCode";
    series2.dataFields.categoryX = "Date";

    series1.data = statedata.covid;
    series2.data = statedata.policy;
    }
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

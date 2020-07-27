import React from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_usaLow from "@amcharts/amcharts4-geodata/usaLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import CovidData from '../../../helpers/data/CovidData';

am4core.useTheme(am4themes_animated);

class Map extends React.Component {
  state = {
    mapdata: [],
  }

  clickEvents = (e) => {
    // zoom to an object
    // e.target.series.chart.zoomToMapObject(e.target);

    // get object info
    var id = e.target.dataItem.dataContext.id;
    var locationCode = id.split('-')[1];

    this.reroute3(locationCode);
  };

  reroute3 = locationCode => this.props.history.push({ pathname: `/location/${locationCode}`, props: locationCode });;


  componentDidMount() {
    // initiates map
    let map = am4core.create("chartdiv", am4maps.MapChart);

    this.GetMapData();

    // identifies which map
    map.geodata = am4geodata_usaLow;
    map.projection = new am4maps.projections.AlbersUsa();

    // Identifies states/state lines
    let polygonSeries = new am4maps.MapPolygonSeries();
    polygonSeries.useGeodata = true;
    map.series.push(polygonSeries);

    // sets up tooltip and initial color
    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#AFAFAF");

    // Create hover state and set alternative fill color
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#4A4A4A");

    // click event
    polygonTemplate.events.on("hit", this.clickEvents, this);

    map.zoomControl = new am4maps.ZoomControl();

    this.polygonSeries = polygonSeries;
    this.polygonTemplate = polygonTemplate;
    this.map = map;
    this.hs = hs;


    return () => {
      map.dispose();
    };
  }

  componentDidUpdate(prevState) {
    if (this.state.mapdata !== prevState.mapdata) {
      // merges map data to information in state and updates tooltips
      this.polygonSeries.data = this.state.mapdata;
      this.polygonTemplate.tooltipText = "[bold]{name}[/]: Cases are {value.status} at a rate of {value.percentChange}%";

      // updates map colors
      this.polygonTemplate.propertyFields.fill = "fill";
    }
  }

  GetMapData = () => {
    CovidData.getMapData()
    .then(mapdata => {
      if (mapdata !== undefined) {
        this.setState({ mapdata: mapdata });
      }
    });
  };

  render() {
    return(
      <div className="Map">
        <h3>COVID19 and Policy Tracking</h3>
        <div id="chartdiv" style={{ width: "90%", height: "450px" }}></div>
      </div>
      )
    }
  }

  export default Map;
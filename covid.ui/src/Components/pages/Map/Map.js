import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_usaLow from "@amcharts/amcharts4-geodata/usaLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import CovidData from '../../../helpers/data/CovidData';
import { CardBody } from 'reactstrap';

am4core.useTheme(am4themes_animated);

class Map extends React.Component {
  state = {
    mapdata: [],
  }

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

    polygonTemplate.events.on("hit", function(ev) {
      // zoom to an object
      ev.target.series.chart.zoomToMapObject(ev.target);

      // get object info
      console.log(ev.target.dataItem.dataContext.name);
    });

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
      this.polygonTemplate.tooltipText = "[bold]{name}[/]: Cases are [underline]{value.status}[/] at a rate of {value.percentChange}%";

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
      <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
    )
  }
}

export default Map;
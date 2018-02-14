import React, { Component } from 'react';
import './WeatherReport.css';

class WeatherReport extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="WeatherReport">
        <header>
          <h2>{this.convertTime(this.props.report.time)}</h2>
        </header>
        <div>
          <p>{this.props.report.summary}</p>
          <p>Low:{this.props.report.temperatureMin}&deg;F</p>
          <p>High:{this.props.report.temperatureMax}&deg;F</p>
        </div>
      </div>
    );
  }

  convertTime(seconds) {
    const dateString = new Date(seconds * 1000).toString();
    return dateString.split(' ').slice(0, 4).join(' ');
  }
}

export default WeatherReport;

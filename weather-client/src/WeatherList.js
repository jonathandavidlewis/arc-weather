import React, { Component } from 'react';
import WeatherReport from './WeatherReport';
import './WeatherList.css';

class WeatherList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="weather-list">
        <header className="Week-header">
          <h2>Last week in weather</h2>
          <div>
            <h3>{this.formatCityState()}</h3>
          </div>
        </header>
        <div class = "weather-list">
          {this.props.weeklyReport.reports.map((report, index) => <WeatherReport report={report} key={index} />)}
        </div>
      </div>
    );
  }

  formatCityState() {
    debugger;
    return `${this.props.weeklyReport.city}, ${this.props.weeklyReport.state}`;
  }
}

export default WeatherList;

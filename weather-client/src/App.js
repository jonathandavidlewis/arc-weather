import React, { Component } from 'react';
import './App.css';
import TitleHeader from './TitleHeader';
import Search from './Search';
import WeatherList from './WeatherList';
import weatherData from './weather-data';
import weatherServiceProvider from './weatherService';

const weatherService = weatherServiceProvider();

class App extends Component {
  constructor() {
    super();
    this.state = {
      coordinates: {},
      validZipcode: true
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.updateWeather = this.updateWeather.bind(this);
    this.requestGeolocation = this.requestGeolocation.bind(this);
    this.setGeolocation = this.setGeolocation.bind(this);
    this.handleZipInput = this.handleZipInput.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
    this.validateZipcode = this.validateZipcode.bind(this);
  }
  render() {
    return (
      <div className="App">
        <TitleHeader title="Last Week's Weather Report" />
        <p className="App-intro">
          Not this week, LAST week.
        </p>
        <h4>Enter a zip code to seach</h4>
        <Search handleKeypress={this.handleKeypress} handleInput={this.handleZipInput} handleSearch={this.handleSearch} />
        {this.renderWarning()}
        {this.renderWeatherList()}
        <div className="block">
        <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
        </div>
      </div>
    );
  }

  validateZipcode(value) {
    return (/(^\d{5}$)|(^\d{5}-\d{4}$)/).test(value);
  }

  handleSearch(e) {
    if(this.validateZipcode(this.state.zipcode)) {
      weatherService(this.state.zipcode, this.updateWeather);
      this.setState({validZipcode: true})
    } else {
      this.setState({validZipcode: false})
    }
  }

  updateWeather(weatherData) {
    this.setState({weatherData});
  }

  requestGeolocation() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setGeolocation);
    }
  }

  setGeolocation(position) {
      const coordinates = {
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude 
      }
      this.setState({coordinates});
  }

  handleZipInput(e) {
    this.setState({
      zipcode: e.target.value
    });
  }

  handleKeypress(e) {
    if(e.key == 'Enter'){
      e.preventDefault();
      this.handleSearch();
    }
  }

  renderWeatherList() {
    if (this.state.weatherData) {
      return <WeatherList weeklyReport={this.state.weatherData} />
    } else {
      return <div><p>Please enter a zipcode to get last week's weather by location</p></div>
    }
  }

  renderWarning() {
    if(this.state.validZipcode) {
      return <div className="block"></div>
    } else {
      return <div className="block">This is not a valid zipcode</div>
    }
  }
}

export default App;

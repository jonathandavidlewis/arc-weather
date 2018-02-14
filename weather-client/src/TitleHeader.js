import React, { Component } from 'react';
import './TitleHeader.css';

class TitleHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="title-header">
        <header className="App-header">
        <h1>{this.props.title}</h1>
       </header>
      </div>
    );
  }
}

export default TitleHeader;

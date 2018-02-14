import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this)
  }
  render() {
    return (
      <div className="Search">
      <form>
        <input placeholder="zipcode" onKeyPress={this.props.handleKeypress} onChange={this.props.handleInput}type="text" />
        <button type="button" onClick={this.handleSubmit}> 
          Submit
        </button>
      </form>
      </div>
    );
  }

  handleSubmit(e) {
    debugger;
    e.preventDefault();
    this.props.handleSearch()
  }
}

export default Search;

import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  //method that passes the state of term to onSearch passed down from App.js
  search() {
    this.props.onSearch(this.state.term);
  }

  //method that sets the state of search bar's term to event target's value
  handleTermChange(event) {
    this.setState({ term: event.target.value });
  }

  //Event handler so they can submit searches by pressing enter as well as clicking button
  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.search();
    }
  };

  render() {
    return (
      <div className="SearchBar">
        <input
          onKeyPress={this.handleKeyPress}
          onChange={this.handleTermChange}
          placeholder="Enter A Song, Album, or Artist"
        />
        <button className="SearchButton" onClick={this.search}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;

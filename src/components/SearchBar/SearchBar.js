import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      word: ""
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleWordChange = this.handleWordChange.bind(this);
  }

  handleWordChange(e) {
    this.setState({ word: e.target.value });
  }

  handleSearch(e) {
    this.props.searchSpotify(this.state.word);
    e.preventDefault();
  }

  render() {
    return (
      <div className="SearchBar">
          <input placeholder="Enter A Song Title" onChange={this.handleWordChange}/>
          <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    )
  }
}

export default SearchBar;

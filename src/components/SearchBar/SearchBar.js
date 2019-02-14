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
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleEnter(e) {
    if (e.keyCode === 13){
      this.props.searchSpotify(this.state.word);
    }
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
          <input placeholder="Enter A Song Title"
                type="text"
                onChange={this.handleWordChange}
                onKeyDown={this.handleEnter}/>
          <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    )
  }
}

export default SearchBar;

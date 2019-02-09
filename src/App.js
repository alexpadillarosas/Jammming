import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import PlayList from "./components/PlayList/PlayList";

class App extends Component {

  constructor(props) {
    super(props);

    this.searchSpotify = this.searchSpotify.bind(this);
  }

  searchSpotify(word) {
    console.log('this button was pressed and the word to search is ' + word );
  }





  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar searchSpotify={this.searchSpotify}/>
          <div className="App-playlist">
            <SearchResults />
            <PlayList />
          </div>

        </div>
      </div>
    );
  }
}

export default App;

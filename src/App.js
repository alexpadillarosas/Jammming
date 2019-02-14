import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from "./components/SearchBar/SearchBar";
import SearchResults from "./components/SearchResults/SearchResults";
import PlayList from "./components/PlayList/PlayList";
import Spotify from "./util/Spotify";

const PLUS = '+';
const MINUS = '-';
const DEFAULT_PLAYLIST_NAME = "New Playlist";

class App extends Component {

  constructor(props) {
    super(props);

    this.searchSpotify = this.searchSpotify.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.modifyName = this.modifyName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);

    this.state = {
        searchResults: [],
        playListTracks: [],
        playListName: DEFAULT_PLAYLIST_NAME
    };
  }

  searchSpotify(word) {

    //  only search when something has been input
    if(word != ''){
       Spotify.search(word).then( tracks => {
         //removing songs that have been already added to the playlist
         for( var i=tracks.length - 1; i>=0; i--){
            for( var j=0; j < this.state.playListTracks.length; j++){
               if(tracks[i] && (tracks[i].name === this.state.playListTracks[j].name)){
                 tracks.splice(i, 1);
               }
             }
          }

            this.setState({
              searchResults : tracks
            });

        });
      console.log(this.state.searchResults);

    }
  }

  addTrack(newTrack) {
    let index = this.state.playListTracks.indexOf(newTrack);
    /**/
    if(index === -1){
      this.setState( prevState => ({
        playListTracks: [...prevState.playListTracks, newTrack]
      }) );
      console.log("the track was added");
    }else{
      console.log("track already exists in the playlist");
    }
  }

  removeTrack(currentTrack) {
    console.log(currentTrack);

    let copy = [...this.state.playListTracks];
    let index = copy.indexOf(currentTrack);
    if(index !== -1){
      copy.splice(index, 1);
      this.setState({playListTracks: copy});
      console.log("the track was removed");
    }else{
      console.log("track is not in the playlist");
    }

  }

  modifyName(newName) {

    this.setState({
      playListName : newName
    });
    console.log("modifyName: " + newName);
  }


  savePlaylist() {
    console.log('save playlist method called, value: ' + this.state.playListName);
    const trackURIs = this.state.playListTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playListName, trackURIs);

    // reset playlist back to new and empty
    this.setState({playListTracks: [], playListName: DEFAULT_PLAYLIST_NAME});

    {/*
    let credentials ;
    let pr = Promise.resolve(Spotify.getUserCredentials()).then(function(value){
      console.log(value);
      credentials = value;
    });

    console.log('credentials: ' + credentials);
    */}

  }

  render() {
    {/*
    const parsed = queryString.parse(window.location.hash); // https://github.com/sindresorhus/query-string
    console.log(parsed);
    console.log(parsed.access_token);
    addTrack={this.addTrack}
    */}
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar searchSpotify={this.searchSpotify}/>
          <div className="App-playlist">
            <SearchResults
                  searchResults={this.state.searchResults}
                  operation={PLUS}
                  onAction={this.addTrack} />
            <PlayList
                  playListTracks={this.state.playListTracks}
                  operation={MINUS}
                  onAction={this.removeTrack}
                  onNameChange={this.modifyName}
                  playListName={this.state.playListName}
                  onSavePlaylist={this.savePlaylist}/>
          </div>

        </div>
      </div>
    );
  }
}

export default App;

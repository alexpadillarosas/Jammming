import React from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';

const SAFE_TO_SPOTIFY = 'SAVE TO SPOTIFY';

class PlayList extends React.Component {

  constructor(props) {
    super(props);

    this.handlePlaylistNameChange = this.handlePlaylistNameChange.bind(this);
  }

  handlePlaylistNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input value={this.props.playListName} onChange={this.handlePlaylistNameChange} />
        <TrackList tracks={this.props.playListTracks} operation={this.props.operation} onAction={this.props.onAction}/>
        <a className="Playlist-save" onClick={this.props.onSavePlaylist} >{SAFE_TO_SPOTIFY}</a>
      </div>
    )
  }
}

export default PlayList;

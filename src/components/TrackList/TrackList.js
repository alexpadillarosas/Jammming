import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {

  render() {
    return (
      <div className="TrackList">
        {
          this.props.tracks.map( track => {
            return <Track key={track.id} track={track} operation={this.props.operation} onAction={this.props.onAction}/>;
          })
        }
      </div>
    )
  }
}

export default TrackList;

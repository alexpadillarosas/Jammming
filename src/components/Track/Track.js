import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    /*console.log(e.target.innerHTML);*/
    console.log(e.target.getAttribute('operation'));

    this.props.onAction(this.props.track);

  }

  render() {
    return (

        <div className="Track" key={this.props.track.id}>
          <div className="Track-information">

            <h3>{this.props.track.name}</h3>
            <audio id="myAudio" controls>
              <source src={this.props.track.preview} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio><br/>
            <p>{this.props.track.artist} | {this.props.track.album}</p>

          </div>
          <a className="Track-action"
              onClick={this.handleClick}
              operation={this.props.operation}
               >{this.props.operation}</a>
        </div>

    );
  }
}

export default Track;
